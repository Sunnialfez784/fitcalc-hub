/**
 * Formula registry — map formulaId → pure calculation function.
 * Individual calculator formulas register here; engine looks them up by config.formulaId.
 */

import type { FormulaFn } from "../types";

const formulaMap = new Map<string, FormulaFn>();

/** Register a formula function under a unique id. */
export function registerFormula(id: string, fn: FormulaFn): void {
  if (formulaMap.has(id)) {
    console.warn(`[calculators] Formula "${id}" is being overwritten.`);
  }
  formulaMap.set(id, fn);
}

/** Resolve a formula by id. Throws if missing. */
export function getFormula(id: string): FormulaFn {
  const fn = formulaMap.get(id);
  if (!fn) {
    throw new Error(
      `[calculators] Formula "${id}" is not registered. Add it via registerFormula().`,
    );
  }
  return fn;
}

export function hasFormula(id: string): boolean {
  return formulaMap.has(id);
}

export function listFormulaIds(): string[] {
  return Array.from(formulaMap.keys());
}

/**
 * Placeholder / noop formula for scaffolding.
 * Real calculators replace this by registering their own formulaId.
 */
export const noopFormula: FormulaFn = () => ({
  value: 0,
  label: "Result",
  interpretation: "Formula not implemented yet.",
  status: "info",
  statusLabel: "Pending",
});

// Scaffold placeholder so the engine bootstraps cleanly.
registerFormula("noop", noopFormula);
