/**
 * FitCalc Hub — Calculator Engine
 *
 * Public API for the config-driven calculator architecture.
 */

import "./bootstrap";

// Types
export type {
  CalculatorCategoryId,
  CalculatorCategory,
  FieldType,
  UnitSystem,
  UnitOption,
  SelectOption,
  CalculatorFieldValidation,
  CalculatorField,
  CalculatorInput,
  ResultStatus,
  ResultRange,
  ChartDataPoint,
  CalculatorResult,
  Recommendation,
  FormulaFn,
  FormulaContext,
  CalculatorFaq,
  CalculatorSeo,
  CalculatorConfig,
  CalculatorRegistryEntry,
} from "./types";

// Registry
export {
  registerCalculator,
  registerCalculators,
  getCalculatorConfig,
  getCalculator,
  listCalculators,
  listCalculatorSlugs,
  getRelatedCalculators,
} from "./configs";

export {
  registerFormula,
  getFormula,
  hasFormula,
  listFormulaIds,
  noopFormula,
  registerRecommendations,
  getRecommendations,
  hasRecommendations,
} from "./formulas";

// Validation
export { buildSchemaFromFields, getDefaultValues } from "./validations";

// Utils
export * from "./utils";

// Data
export { CALCULATOR_CATEGORIES, getCategoryById, EXAMPLE_CALCULATOR_TEMPLATE } from "./data";

// Hooks
export { useCalculatorEngine, useCalculatorCatalog } from "./hooks";

// Components
export { CalculatorPage } from "./components";
