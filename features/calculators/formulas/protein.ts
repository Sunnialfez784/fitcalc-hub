import { registerFormula } from "./registry";
import {
  calculateProteinTarget,
  distributeProteinMeals,
  toKg,
  type ActivityLevel,
  type WeightUnit,
} from "../utils";

registerFormula("protein", (input) => {
  const weightKg = toKg(Number(input.weight), (input.weightUnit as WeightUnit) || "kg");
  const goal = (input.goal as "maintain" | "cut" | "build") || "maintain";
  const activity = (input.activity as ActivityLevel) || "moderate";

  const { min, max, recommended } = calculateProteinTarget(weightKg, goal, activity);
  const meals = distributeProteinMeals(recommended, 4);

  const goalLabel = goal === "cut" ? "Lose Fat" : goal === "build" ? "Gain Muscle" : "Maintain";

  return {
    value: recommended,
    unit: "g/day",
    label: "Recommended Protein",
    status: "optimal",
    statusLabel: goalLabel,
    progress: Math.round(((recommended - min) / Math.max(max - min, 1)) * 100),
    metrics: [
      { label: "Minimum", value: min, unit: "g" },
      { label: "Recommended", value: recommended, unit: "g" },
      { label: "Maximum", value: max, unit: "g" },
      ...meals.map((m) => ({ label: m.meal, value: m.grams, unit: "g" })),
    ],
    interpretation: `For ${goalLabel.toLowerCase()} at your weight and activity, aim for ${recommended} g protein/day (${min}–${max} g). Spread across ~4 meals: ${meals.map((m) => `${m.grams}g`).join(", ")}.`,
    chart: {
      type: "bar",
      data: meals.map((m, i) => ({
        label: m.meal,
        value: m.grams,
        color: ["#2F6B4F", "#3b82f6", "#8b5cf6", "#06b6d4"][i],
      })),
    },
  };
});
