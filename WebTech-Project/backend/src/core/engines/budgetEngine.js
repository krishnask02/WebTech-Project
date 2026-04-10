// core/engines/budgetEngine.js

const logger = require('../../infrastructure/logger/logger');

class BudgetEngine {
  constructor(policy = {}) {
    this.policy = {
      strategy: policy.strategy || 'greedy', // 'greedy' | 'valueBased'
      sortBy: policy.sortBy || 'cost', // 'cost' | 'rating' | 'score'
      allowPartial: policy.allowPartial || false,
      ...policy
    };
  }

  /**
   * Main allocation entry
   * @param {Array} places
   * @param {number} totalBudget
   * @returns {Object}
   */
  allocateBudget(places = [], totalBudget = 0) {
    this._validateInput(places, totalBudget);

    logger.info('[BudgetEngine] Starting allocation', {
      totalPlaces: places.length,
      totalBudget
    });

    let processedPlaces = this._preprocessPlaces(places);

    // Strategy selection
    let selected;
    switch (this.policy.strategy) {
      case 'valueBased':
        selected = this._valueBasedAllocation(processedPlaces, totalBudget);
        break;
      case 'greedy':
      default:
        selected = this._greedyAllocation(processedPlaces, totalBudget);
    }

    const totalSpent = selected.reduce((sum, p) => sum + p.cost, 0);
    const remainingBudget = totalBudget - totalSpent;

    const result = {
      selectedPlaces: selected,
      totalSpent,
      remainingBudget,
      utilization: totalBudget > 0 ? (totalSpent / totalBudget) : 0,
      meta: {
        strategy: this.policy.strategy,
        totalConsidered: places.length,
        selectedCount: selected.length
      }
    };

    logger.info('[BudgetEngine] Allocation completed', result.meta);

    return result;
  }

  // -----------------------------
  // 🔹 Core Strategies
  // -----------------------------

  /**
   * Greedy allocation (O(n log n))
   */
  _greedyAllocation(places, budget) {
    let remaining = budget;
    const selected = [];

    for (const place of places) {
      if (place.cost <= remaining) {
        selected.push(place);
        remaining -= place.cost;
      }
    }

    return selected;
  }

  /**
   * Value-based allocation (cost vs rating/score)
   * Better than greedy in many real-world cases
   */
  _valueBasedAllocation(places, budget) {
    let remaining = budget;
    const selected = [];

    // Sort by value density
    const sorted = [...places].sort((a, b) => {
      const valA = (a.score || a.rating || 1) / a.cost;
      const valB = (b.score || b.rating || 1) / b.cost;
      return valB - valA;
    });

    for (const place of sorted) {
      if (place.cost <= remaining) {
        selected.push(place);
        remaining -= place.cost;
      }
    }

    return selected;
  }

  // -----------------------------
  // 🔹 Helpers
  // -----------------------------

  _preprocessPlaces(places) {
    const cleaned = places
      .filter(p => p && typeof p.cost === 'number' && p.cost >= 0)
      .map(p => ({
        ...p,
        score: p.score || p.rating || 0
      }));

    return this._sortPlaces(cleaned);
  }

  _sortPlaces(places) {
    switch (this.policy.sortBy) {
      case 'rating':
        return places.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'score':
        return places.sort((a, b) => (b.score || 0) - (a.score || 0));
      case 'cost':
      default:
        return places.sort((a, b) => a.cost - b.cost);
    }
  }

  _validateInput(places, budget) {
    if (!Array.isArray(places)) {
      throw new Error('Places must be an array');
    }

    if (typeof budget !== 'number' || budget < 0) {
      throw new Error('Budget must be a non-negative number');
    }
  }
}

module.exports = BudgetEngine;