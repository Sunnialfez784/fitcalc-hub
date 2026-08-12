import { registerFormula } from "./registry";
import {
  calculateBmrMifflin,
  calculateTdee,
  round,
  toCm,
  toKg,
  type ActivityLevel,
  type LengthUnit,
  type Sex,
  type WeightUnit,
} from "../utils";

registerFormula("tdee", (input) => {
  const weightKg = toKg(Number(input.weight), (input.weightUnit as WeightUnit) || "kg");
  const heightCm = toCm(Number(input.height), (input.heightUnit as LengthUnit) || "cm");
  const age = Number(input.age);
  const sex = (input.gender as Sex) || "male";
  const activity = (input.activity as ActivityLevel) || "moderate";

  const bmr = calculateBmrMifflin(weightKg, heightCm, age, sex);
  const maintenance = calculateTdee(bmr, activity);
  const loss = round(maintenance - 500, 0);
  const gain = round(maintenance + 300, 0);

  return {
    value: maintenance,
    unit: "kcal/day",
    label: "Maintenance Calories (TDEE)",
    status: "optimal",
    statusLabel: "Maintenance",
    progress: 70,
    metrics: [
      { label: "Maintain", value: maintenance, unit: "kcal" },
      { label: "Lose weight", value: loss, unit: "kcal" },
      { label: "Gain weight", value: gain, unit: "kcal" },
    ],
    interpretation: `Your TDEE is ${maintenance} kcal/day. For fat loss, aim near ${loss} kcal (−500). For gradual gain, aim near ${gain} kcal (+300). BMR underpinning this estimate: ${bmr} kcal.`,
    chart: {
      type: "bar",
      data: [
        { label: "Loss", value: loss, color: "#f59e0b" },
        { label: "Maintain", value: maintenance, color: "#22c55e" },
        { label: "Gain", value: gain, color: "#3b82f6" },
      ],
    },
  };
});
