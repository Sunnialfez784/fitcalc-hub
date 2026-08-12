import { registerFormula } from "./registry";
import {
  calculateBmi,
  getBmiCategory,
  healthyWeightRangeKg,
  progressPercent,
  toCm,
  toKg,
  type LengthUnit,
  type WeightUnit,
} from "../utils";

registerFormula("bmi", (input) => {
  const weightKg = toKg(Number(input.weight), (input.weightUnit as WeightUnit) || "kg");
  const heightCm = toCm(Number(input.height), (input.heightUnit as LengthUnit) || "cm");
  const bmi = calculateBmi(weightKg, heightCm);
  const range = getBmiCategory(bmi);
  const healthy = healthyWeightRangeKg(heightCm);

  return {
    value: bmi,
    label: "Your BMI",
    status: range.status,
    statusLabel: range.label,
    range,
    progress: progressPercent(bmi, 15, 40),
    metrics: [
      { label: "Category", value: range.label },
      { label: "Healthy min", value: healthy.min, unit: "kg" },
      { label: "Healthy max", value: healthy.max, unit: "kg" },
    ],
    interpretation: `Your BMI is ${bmi} (${range.label}). A healthy weight for your height is roughly ${healthy.min}–${healthy.max} kg.`,
    chart: {
      type: "bar",
      data: [
        { label: "Under", value: 18.4, color: "#3b82f6" },
        { label: "Normal", value: 24.9, color: "#22c55e" },
        { label: "Over", value: 29.9, color: "#f59e0b" },
        { label: "You", value: bmi, color: range.color },
      ],
    },
  };
});
