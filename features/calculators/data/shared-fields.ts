/**
 * Shared field presets — reuse across calculator configs.
 */

import type { CalculatorField } from "../types";

export const weightFields: CalculatorField[] = [
  {
    name: "weight",
    label: "Weight",
    type: "number",
    placeholder: "70",
    defaultValue: 70,
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
];

export const heightFields: CalculatorField[] = [
  {
    name: "height",
    label: "Height",
    type: "number",
    placeholder: "170",
    defaultValue: 170,
    description: "Use cm or feet (e.g. 5.7)",
    unitField: "heightUnit",
    validation: { required: true, min: 3, max: 300 },
    colSpan: 1,
  },
  {
    name: "heightUnit",
    label: "Unit",
    type: "unit",
    defaultValue: "cm",
    units: [
      { value: "cm", label: "cm", system: "metric" },
      { value: "ft", label: "ft", system: "imperial" },
    ],
    colSpan: 1,
  },
];

export const ageField: CalculatorField = {
  name: "age",
  label: "Age",
  type: "number",
  placeholder: "30",
  defaultValue: 30,
  validation: { required: true, min: 10, max: 120, integer: true },
  colSpan: 1,
};

export const genderField: CalculatorField = {
  name: "gender",
  label: "Gender",
  type: "radio",
  defaultValue: "male",
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  validation: { required: true },
  colSpan: 2,
};

export const activityField: CalculatorField = {
  name: "activity",
  label: "Activity Level",
  type: "select",
  defaultValue: "moderate",
  options: [
    { value: "sedentary", label: "Sedentary (little or no exercise)" },
    { value: "light", label: "Light Exercise (1–3 days/week)" },
    { value: "moderate", label: "Moderate Exercise (3–5 days/week)" },
    { value: "active", label: "Heavy Exercise (6–7 days/week)" },
    { value: "very_active", label: "Athlete (2×/day or intense)" },
  ],
  validation: { required: true },
  colSpan: 2,
};

export const proteinGoalField: CalculatorField = {
  name: "goal",
  label: "Goal",
  type: "select",
  defaultValue: "maintain",
  options: [
    { value: "maintain", label: "Maintain" },
    { value: "cut", label: "Lose Fat" },
    { value: "build", label: "Gain Muscle" },
  ],
  validation: { required: true },
  colSpan: 2,
};
