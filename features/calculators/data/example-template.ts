/**
 * Example config template — NOT a live calculator.
 * Copy this pattern when adding a new calculator in < 5 minutes.
 *
 * Steps:
 * 1. Create formula in formulas/ (registerFormula)
 * 2. Create config object (below pattern)
 * 3. Call registerCalculator(config) from configs/index or a bootstrap file
 */

import type { CalculatorConfig } from "../types";

/** Template — do not register. Use as copy-paste reference. */
export const EXAMPLE_CALCULATOR_TEMPLATE: CalculatorConfig = {
  id: "example-bmi",
  slug: "bmi",
  title: "BMI Calculator",
  shortTitle: "BMI",
  description: "Calculate your Body Mass Index and healthy weight range.",
  category: "body-composition",
  icon: "Scale",
  featured: true,
  published: false, // keep false until formula is implemented
  defaultUnitSystem: "metric",
  seo: {
    title: "BMI Calculator — Free Body Mass Index Tool",
    description:
      "Calculate your BMI instantly with metric or imperial units. See healthy ranges and recommendations.",
    keywords: ["BMI", "body mass index", "healthy weight"],
  },
  fields: [
    {
      name: "weight",
      label: "Weight",
      type: "number",
      placeholder: "70",
      unitField: "weightUnit",
      validation: { required: true, min: 20, max: 400 },
      colSpan: 1,
    },
    {
      name: "weightUnit",
      label: "Unit",
      type: "unit",
      defaultValue: "kg",
      units: [
        { value: "kg", label: "kg", system: "metric" },
        { value: "lb", label: "lb", system: "imperial" },
      ],
      colSpan: 1,
    },
    {
      name: "height",
      label: "Height",
      type: "number",
      placeholder: "170",
      unitField: "heightUnit",
      validation: { required: true, min: 50, max: 300 },
    },
    {
      name: "heightUnit",
      label: "Unit",
      type: "unit",
      defaultValue: "cm",
      units: [
        { value: "cm", label: "cm", system: "metric" },
        { value: "in", label: "in", system: "imperial" },
      ],
    },
  ],
  formulaId: "bmi", // must match registerFormula("bmi", fn)
  ranges: [
    { id: "underweight", label: "Underweight", max: 18.5, status: "under" },
    { id: "normal", label: "Normal", min: 18.5, max: 25, status: "normal" },
    { id: "overweight", label: "Overweight", min: 25, max: 30, status: "over" },
    { id: "obese", label: "Obese", min: 30, status: "warning" },
  ],
  formulaExplanation: {
    title: "How BMI is calculated",
    body: "BMI = weight (kg) ÷ height (m)². Categories follow WHO guidelines.",
    latex: "BMI = \\frac{weight_{kg}}{height_m^2}",
  },
  relatedCalculators: ["tdee", "body-fat", "ideal-weight"],
  faqs: [
    {
      question: "Is BMI accurate for athletes?",
      answer:
        "BMI does not distinguish muscle from fat. Athletes may classify as overweight despite low body fat.",
    },
  ],
};
