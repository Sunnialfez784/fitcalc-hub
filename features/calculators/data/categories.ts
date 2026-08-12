import type { CalculatorCategory } from "../types";

/** Static category catalog for filters and navigation. */
export const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
  {
    id: "body-composition",
    name: "Body Composition",
    slug: "body-composition",
    description: "BMI, body fat, lean mass, ideal weight",
  },
  {
    id: "nutrition",
    name: "Nutrition",
    slug: "nutrition",
    description: "Calories, macros, protein, carbs",
  },
  {
    id: "metabolism",
    name: "Metabolism",
    slug: "metabolism",
    description: "BMR, TDEE, calorie needs",
  },
  {
    id: "cardio",
    name: "Cardio",
    slug: "cardio",
    description: "Heart rate zones, VO2 max",
  },
  {
    id: "hydration",
    name: "Hydration",
    slug: "hydration",
    description: "Water intake and fluid needs",
  },
  {
    id: "strength",
    name: "Strength",
    slug: "strength",
    description: "One-rep max, strength ratios",
  },
  {
    id: "pregnancy",
    name: "Pregnancy",
    slug: "pregnancy",
    description: "Pregnancy weight and due date tools",
  },
  {
    id: "general",
    name: "General",
    slug: "general",
    description: "Everyday health calculators",
  },
];

export function getCategoryById(id: string) {
  return CALCULATOR_CATEGORIES.find((c) => c.id === id);
}
