/**
 * tripOrchestrator.js
 *
 * Production-grade orchestration layer
 * Responsibilities:
 * - Input validation (strict + safe defaults)
 * - External API fault tolerance
 * - Engine coordination
 * - Observability (logs, timings)
 * - Deterministic output structure
 */

import { optimizeRoute } from "../Engines/routeOptimizationEngine.js";
import { rankPlaces } from "../Engines/recommendationEngine.js";
import { calculateBudget } from "../Engines/budgetEngine.js";

import { weights } from "../policies/scoringPolicy.js";

import { getPlacesByCity } from "../../infrastructure/external/placesAPI.js";
import { getWeather } from "../../infrastructure/external/weatherAPI.js";

import { saveTrip } from "../../domain/repositories/tripRepository.js";

import logger from "../../infrastructure/logger/logger.js";

// -----------------------------
// Constants (avoid magic numbers)
// -----------------------------
const PLACES_PER_DAY = 3;
const MAX_RECOMMENDATIONS = 10;

// -----------------------------
// Utility: Input Validation
// -----------------------------
const validateInput = (input) => {
  if (!input) throw new Error("Input is required");

  const { city, budget, days } = input;

  if (!city || typeof city !== "string") {
    throw new Error("Invalid or missing 'city'");
  }

  if (!budget || typeof budget !== "number" || budget <= 0) {
    throw new Error("Invalid 'budget'");
  }

  if (!days || typeof days !== "number" || days <= 0) {
    throw new Error("Invalid 'days'");
  }
};

// -----------------------------
// Utility: Safe Async Wrapper
// Prevents full failure on non-critical APIs
// -----------------------------
const safeExecute = async (fn, fallback = null) => {
  try {
    return await fn();
  } catch (err) {
    logger.warn("Non-critical service failed", {
      error: err.message
    });
    return fallback;
  }
};

// -----------------------------
// Main Orchestrator
// -----------------------------
export const buildTripPlan = async (input) => {
  const startTime = Date.now();

  try {
    // =========================
    // 1. VALIDATION
    // =========================
    validateInput(input);

    const {
      userId,
      city,
      budget,
      interests = [],
      days
    } = input;

    logger.info("Trip orchestration started", { city, days, budget });

    // =========================
    // 2. FETCH DATA
    // =========================
    const places = await getPlacesByCity(city);

    if (!Array.isArray(places) || places.length === 0) {
      throw new Error("No places found");
    }

    // =========================
    // 3. RECOMMENDATION ENGINE
    // =========================
    const rankedPlaces = rankPlaces(places, {
      interests,
      budget,
      weights
    });

    if (!rankedPlaces.length) {
      throw new Error("Recommendation engine returned no results");
    }

    // =========================
    // 4. SELECT TOP PLACES
    // =========================
    const limit = days * PLACES_PER_DAY;
    const selectedPlaces = rankedPlaces.slice(0, limit);

    // =========================
    // 5. ROUTE OPTIMIZATION
    // =========================
    const optimizedRoute = optimizeRoute(selectedPlaces);

    if (!optimizedRoute.length) {
      throw new Error("Route optimization failed");
    }

    // =========================
    // 6. BUILD ITINERARY
    // =========================
    const itinerary = [];
    for (let i = 0; i < days; i++) {
      itinerary.push({
        day: i + 1,
        places: optimizedRoute.slice(
          i * PLACES_PER_DAY,
          (i + 1) * PLACES_PER_DAY
        )
      });
    }

    // =========================
    // 7. BUDGET ENGINE
    // =========================
    const budgetDetails = calculateBudget({
      itinerary,
      totalBudget: budget
    });

    // =========================
    // 8. OPTIONAL ENRICHMENTS
    // =========================
    const weatherData = await safeExecute(
      () => getWeather(city),
      null
    );

    // =========================
    // 9. FINAL RESPONSE
    // =========================
    const tripPlan = {
      meta: {
        city,
        days,
        generatedAt: new Date().toISOString(),
        executionTimeMs: Date.now() - startTime
      },
      itinerary,
      recommendations: rankedPlaces.slice(0, MAX_RECOMMENDATIONS),
      budget: budgetDetails,
      weather: weatherData
    };

    // =========================
    // 10. PERSISTENCE (ASYNC SAFE)
    // =========================
    if (userId) {
      safeExecute(() =>
        saveTrip({
          userId,
          ...tripPlan
        })
      );
    }

    logger.info("Trip orchestration completed", {
      city,
      duration: Date.now() - startTime
    });

    return tripPlan;

  } catch (error) {
    logger.error("Trip orchestration failed", {
      error: error.message,
      stack: error.stack
    });

    // Structured error (important for frontend)
    throw {
      message: error.message,
      code: "TRIP_BUILD_FAILED"
    };
  }
};