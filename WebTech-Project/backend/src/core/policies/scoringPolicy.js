import { scoringPolicy } from "../Policies/scoringPolicy.js";

export const calculateScore = (place, userPrefs) => {
  const { weights, thresholds, penalties, normalization } = scoringPolicy;

  // 1. Hard filter (optional strict mode)
  if (place.rating < thresholds.minRating) {
    return 0;
  }

  // 2. Rating score
  let ratingScore =
    (place.rating / normalization.ratingScale) * weights.rating;

  // Apply penalty if near threshold
  if (place.rating < thresholds.minRating + 0.5) {
    ratingScore *= penalties.lowRating;
  }

  // 3. Interest score (fractional match)
  const interestMatches = userPrefs.interests.filter(
    (i) => i === place.category
  ).length;

  const interestScore =
    (interestMatches / userPrefs.interests.length) * weights.interest;

  // 4. Budget score (smooth decay)
  const budgetRatio = place.cost / userPrefs.budget;

  let budgetScore = 0;

  if (budgetRatio <= 1) {
    budgetScore = weights.budget;
  } else if (budgetRatio <= thresholds.maxBudgetDeviation) {
    const decay = 1 - (budgetRatio - 1);
    budgetScore = weights.budget * decay;
  }

  // 5. Final score
  const totalScore = ratingScore + interestScore + budgetScore;

  return Math.min(1, totalScore);
};