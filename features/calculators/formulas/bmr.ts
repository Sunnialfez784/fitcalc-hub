import { registerFormula } from "./registry";
import {
  calculateBmrMifflin,
  calculateTdee,
  toCm,
  toKg,
  type ActivityLevel,
  type LengthUnit,
  type Sex,
  type WeightUnit,
} from "../utils";

registerFormula("bmr", (input) => {
  const weightKg = toKg(Number(input.weight), (input.weightUnit as WeightUnit) || "kg");
  const heightCm = toCm(Number(input.height), (input.heightUnit as LengthUnit) || "cm");
  const age = Number(input.age);
  const sex = (input.gender as Sex) || "male";

  const bmr = calculateBmrMifflin(weightKg, heightCm, age, sex);
  // Sedentary estimate for “daily calories at rest lifestyle”
  const sedentaryCalories = calculateTdee(bmr, "sedentary" as ActivityLevel);

  return {
    value: bmr,
    unit: "kcal/day",
    label: "Basal Metabolic Rate",
    status: "info",
    statusLabel: "Mifflin-St Jeor",
    metrics: [
      { label: "BMR", value: bmr, unit: "kcal" },
      { label: "Sedentary daily", value: sedentaryCalories, unit: "kcal" },
      { label: "Per hour", value: Math.round(bmr / 24), unit: "kcal" },
    ],
    interpretation: `Your body burns about ${bmr} kcal/day at complete rest. Even with a sedentary lifestyle, daily needs are around ${sedentaryCalories} kcal (BMR × 1.2). Use TDEE for activity-adjusted targets.`,
    chart: {
      type: "bar",
      data: [
        { label: "BMR", value: bmr, color: "#2F6B4F" },
        { label: "Sedentary", value: sedentaryCalories, color: "#3b82f6" },
      ],
    },
  };
});
