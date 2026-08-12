/**
 * Calculator config registry — single source of truth for all calculators.
 * Add a calculator by: 1) register formula  2) push config here.
 */

import type { CalculatorConfig, CalculatorRegistryEntry } from "../types";
import { getFormula, hasFormula } from "../formulas";

const configs = new Map<string, CalculatorConfig>();

/** Register a calculator configuration. */
export function registerCalculator(config: CalculatorConfig): void {
  if (configs.has(config.slug)) {
    console.warn(`[calculators] Config "${config.slug}" is being overwritten.`);
  }
  configs.set(config.slug, { published: true, ...config });
}

/** Register many configs at once. */
export function registerCalculators(list: CalculatorConfig[]): void {
  for (const config of list) {
    registerCalculator(config);
  }
}

/** Get config by slug. */
export function getCalculatorConfig(slug: string): CalculatorConfig | undefined {
  return configs.get(slug);
}

/** Get config + resolved formula. */
export function getCalculator(slug: string): CalculatorRegistryEntry | undefined {
  const config = configs.get(slug);
  if (!config) return undefined;
  if (!hasFormula(config.formulaId)) {
    console.warn(`[calculators] Formula "${config.formulaId}" missing for "${slug}". Using noop.`);
  }
  return {
    ...config,
    formula: hasFormula(config.formulaId) ? getFormula(config.formulaId) : getFormula("noop"),
  };
}

/** List all published calculator configs. */
export function listCalculators(options?: {
  category?: string;
  featured?: boolean;
  includeUnpublished?: boolean;
}): CalculatorConfig[] {
  let list = Array.from(configs.values());

  if (!options?.includeUnpublished) {
    list = list.filter((c) => c.published !== false);
  }
  if (options?.category) {
    list = list.filter((c) => c.category === options.category);
  }
  if (options?.featured) {
    list = list.filter((c) => c.featured);
  }

  return list.sort((a, b) => a.title.localeCompare(b.title));
}

export function listCalculatorSlugs(): string[] {
  return listCalculators().map((c) => c.slug);
}

export function getRelatedCalculators(slug: string): CalculatorConfig[] {
  const config = configs.get(slug);
  if (!config?.relatedCalculators?.length) return [];
  return config.relatedCalculators
    .map((s) => configs.get(s))
    .filter((c): c is CalculatorConfig => Boolean(c));
}
