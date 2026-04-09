// core/engines/recommendationEngine.js

/**
 * RecommendationEngine
 * ---------------------
 * Responsible for ranking places based on:
 * - User interests
 * - Place rating
 * - Budget compatibility
 *
 * This is part of the "core intelligence layer" of the system
 * (NOT just CRUD — actual decision logic).
 */

class RecommendationEngine {
  constructor(policy) {
    /**
     * policy → defines scoring weights and thresholds
     * Example:
     * {
     *   interestWeight: 0.5,
     *   ratingWeight: 0.3,
     *   costWeight: 0.2
     * }
     */
    this.policy = policy;
  }

  /**
   * Normalize rating to [0, 1]
   * Assumption: rating is out of 5
   */
  normalizeRating(rating) {
    if (!rating || rating < 0) return 0;
    return Math.min(rating / 5, 1);
  }

  /**
   * Interest matching score
   * Instead of binary (0/1), allow partial scoring
   *
   * Example:
   * userPrefs.interests = ["food", "nature"]
   * place.category = "food"
   */
  computeInterestScore(place, userPrefs) {
    if (!userPrefs?.interests || userPrefs.interests.length === 0) {
      return 0; // no preference provided
    }

    // Exact match → full score
    if (userPrefs.interests.includes(place.category)) {
      return 1;
    }

    // Optional: future enhancement → similarity matching
    // Example: "adventure" ~ "trekking"
    return 0;
  }

  /**
   * Cost compatibility score
   *
   * Strategy:
   * - Within budget → high score
   * - Slightly above → partial penalty
   * - Too expensive → 0
   */
  computeCostScore(placeCost, budget) {
    if (!placeCost || !budget) return 0;

    if (placeCost <= budget) {
      return 1;
    }

    // Soft penalty if slightly above budget (within 20%)
    const tolerance = 0.2 * budget;

    if (placeCost <= budget + tolerance) {
      return 0.5;
    }

    return 0;
  }

  /**
   * Core scoring function
   * Combines all factors using weighted sum
   */
  scorePlace(place, userPrefs, budget) {
    const {
      interestWeight = 0.4,
      ratingWeight = 0.3,
      costWeight = 0.3
    } = this.policy;

    // --- Individual Scores ---
    const interestScore = this.computeInterestScore(place, userPrefs);
    const ratingScore = this.normalizeRating(place.rating);
    const costScore = this.computeCostScore(place.cost, budget);

    // --- Final Weighted Score ---
    const totalScore =
      interestWeight * interestScore +
      ratingWeight * ratingScore +
      costWeight * costScore;

    return Number(totalScore.toFixed(4)); // clean output
  }

  /**
   * Rank places based on computed score
   */
  rankPlaces(places, userPrefs, budget) {
    if (!Array.isArray(places)) return [];

    return places
      .map(place => ({
        ...place,
        score: this.scorePlace(place, userPrefs, budget)
      }))
      .sort((a, b) => b.score - a.score);
  }
}

module.exports = RecommendationEngine;