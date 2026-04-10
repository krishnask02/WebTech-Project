// core/engines/routeOptimizationEngine.js

const { calculateDistance } = require('../../utils/distance');

class RouteOptimizationEngine {
  /**
   * @param {Object} options
   * @param {Function} [options.distanceFn] - Custom distance function
   * @param {Object} [options.logger] - Optional logger (winston/pino)
   */
  constructor(options = {}) {
    this.distanceFn = options.distanceFn || calculateDistance;
    this.logger = options.logger || console;
  }

  /**
   * Validate input places
   * @private
   */
  _validatePlaces(places) {
    if (!Array.isArray(places)) {
      throw new TypeError('places must be an array');
    }

    for (const place of places) {
      if (
        !place ||
        !place.location ||
        typeof place.location.lat !== 'number' ||
        typeof place.location.lng !== 'number'
      ) {
        throw new Error(
          `Invalid place format: each place must have { location: { lat, lng } }`
        );
      }
    }
  }

  /**
   * Compute distance safely
   * @private
   */
  _safeDistance(a, b) {
    try {
      return this.distanceFn(a, b);
    } catch (err) {
      this.logger.error('Distance calculation failed', { a, b, err });
      return Infinity;
    }
  }

  /**
   * Optimize route using Nearest Neighbor heuristic
   *
   * Time Complexity: O(n^2)
   * Space Complexity: O(n)
   *
   * @param {Array} places
   * @param {Object} [options]
   * @param {Object} [options.startLocation] - Optional starting point
   * @returns {Object}
   */
  optimizeRoute(places, options = {}) {
    this._validatePlaces(places);

    if (places.length === 0) {
      return {
        route: [],
        totalDistance: 0,
      };
    }

    const unvisited = [...places];
    const visited = [];

    let current;

    // Optional: custom start point
    if (options.startLocation) {
      current = {
        location: options.startLocation,
        __isVirtualStart: true,
      };
    } else {
      current = unvisited.shift(); // deterministic start
      visited.push(current);
    }

    let totalDistance = 0;

    while (unvisited.length > 0) {
      let nearestIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const dist = this._safeDistance(
          current.location,
          unvisited[i].location
        );

        if (dist < minDistance) {
          minDistance = dist;
          nearestIndex = i;
        }
      }

      if (nearestIndex === -1) {
        throw new Error('Route optimization failed: no reachable node found');
      }

      const next = unvisited.splice(nearestIndex, 1)[0];

      totalDistance += minDistance;
      visited.push(next);
      current = next;
    }

    return {
      route: visited,
      totalDistance,
      metadata: {
        algorithm: 'nearest-neighbor',
        complexity: 'O(n^2)',
      },
    };
  }
}

module.exports = RouteOptimizationEngine;