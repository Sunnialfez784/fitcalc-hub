/**
 * Recommendation registry — dynamic tips keyed by id (client-safe).
 * Use instead of putting functions on CalculatorConfig (not serializable to Client Components).
 */

import type { CalculatorResult, Recommendation } from "../types";

export type RecommendationFn = (result: CalculatorResult) => Recommendation[];

const recommendationMap = new Map<string, RecommendationFn>();

export function registerRecommendations(id: string, fn: RecommendationFn): void {
  recommendationMap.set(id, fn);
}

export function getRecommendations(
  id: string | undefined,
  result: CalculatorResult,
): Recommendation[] {
  if (!id) return [];
  const fn = recommendationMap.get(id);
  return fn ? fn(result) : [];
}

export function hasRecommendations(id: string): boolean {
  return recommendationMap.has(id);
}
