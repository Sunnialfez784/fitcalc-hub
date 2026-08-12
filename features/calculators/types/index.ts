/**
 * FitCalc Hub — Calculator Engine Types
 * Config-driven architecture supporting 100+ calculators without duplication.
 */

import type { LucideIcon } from "lucide-react";
import type { ZodType } from "zod";

// =============================================================================
// Categories
// =============================================================================

export type CalculatorCategoryId =
  | "body-composition"
  | "nutrition"
  | "cardio"
  | "strength"
  | "hydration"
  | "metabolism"
  | "pregnancy"
  | "general";

export type CalculatorCategory = {
  id: CalculatorCategoryId;
  name: string;
  slug: string;
  description: string;
  icon?: LucideIcon;
};

// =============================================================================
// Field types (form engine)
// =============================================================================

export type FieldType = "number" | "text" | "select" | "radio" | "checkbox" | "slider" | "unit";

export type UnitSystem = "metric" | "imperial";

export type UnitOption = {
  value: string;
  label: string;
  system?: UnitSystem;
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export type CalculatorFieldValidation = {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
  message?: string;
};

export type CalculatorField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  defaultValue?: string | number | boolean;
  /** Options for select / radio */
  options?: SelectOption[];
  /** Slider bounds */
  min?: number;
  max?: number;
  step?: number;
  /** Unit selector pairs with this field */
  unitField?: string;
  units?: UnitOption[];
  validation?: CalculatorFieldValidation;
  /** Show when condition matches (simple key/value) */
  showWhen?: {
    field: string;
    equals: string | number | boolean;
  };
  /** Column span in form grid */
  colSpan?: 1 | 2;
};

export type CalculatorInput = Record<string, string | number | boolean | undefined>;

// =============================================================================
// Results
// =============================================================================

export type ResultStatus = "under" | "normal" | "over" | "optimal" | "warning" | "info";

export type ResultRange = {
  id: string;
  label: string;
  min?: number;
  max?: number;
  status: ResultStatus;
  color?: string;
  description?: string;
};

export type ChartDataPoint = {
  label: string;
  value: number;
  color?: string;
};

export type CalculatorResult = {
  /** Primary numeric or text value */
  value: number | string;
  /** Display unit (kg, %, kcal, etc.) */
  unit?: string;
  /** Human-readable label for the primary result */
  label?: string;
  /** Status badge */
  status?: ResultStatus;
  statusLabel?: string;
  /** Secondary metrics */
  metrics?: Array<{
    label: string;
    value: number | string;
    unit?: string;
  }>;
  /** Matched healthy range (if applicable) */
  range?: ResultRange;
  /** Chart datasets for ResultChart */
  chart?: {
    type: "bar" | "pie" | "gauge" | "progress";
    data: ChartDataPoint[];
  };
  /** 0–100 for progress indicator */
  progress?: number;
  /** Explanation / interpretation */
  interpretation?: string;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
  icon?: string;
};

// =============================================================================
// Formula & config
// =============================================================================

export type FormulaFn = (input: CalculatorInput, context?: FormulaContext) => CalculatorResult;

export type FormulaContext = {
  unitSystem: UnitSystem;
};

export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type CalculatorSeo = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

export type CalculatorConfig = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: CalculatorCategoryId;
  /** Lucide icon name key — resolved at render time */
  icon: string;
  seo: CalculatorSeo;
  fields: CalculatorField[];
  /** Key registered in features/calculators/formulas */
  formulaId: string;
  /** Optional custom Zod schema override */
  schemaOverride?: ZodType<CalculatorInput>;
  ranges?: ResultRange[];
  /**
   * Static recommendation cards.
   * For dynamic tips, use recommendationId + registerRecommendations() instead
   * (functions on config cannot be passed to Client Components).
   */
  recommendations?: Recommendation[];
  /** Key registered via registerRecommendations() */
  recommendationId?: string;
  relatedCalculators?: string[];
  faqs?: CalculatorFaq[];
  formulaExplanation?: {
    title?: string;
    body: string;
    latex?: string;
  };
  /** Default unit system */
  defaultUnitSystem?: UnitSystem;
  featured?: boolean;
  published?: boolean;
};

export type CalculatorRegistryEntry = CalculatorConfig & {
  formula: FormulaFn;
};
