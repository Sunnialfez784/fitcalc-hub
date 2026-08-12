import { registerFormula } from "./registry";
import { calculateWaterIntakeLiters, round, toKg, type WeightUnit } from "../utils";

registerFormula("water", (input) => {
  const weightKg = toKg(Number(input.weight), (input.weightUnit as WeightUnit) || "kg");
  const exerciseMinutes = Number(input.exerciseMinutes ?? 0);
  const weather = (input.weather as "cool" | "moderate" | "hot") || "moderate";

  const { total, base, workout } = calculateWaterIntakeLiters(weightKg, exerciseMinutes, weather);
  const bottles500 = Math.ceil(total / 0.5);
  const glasses250 = Math.ceil(total / 0.25);

  return {
    value: total,
    unit: "L/day",
    label: "Daily Water Intake",
    status: weather === "hot" ? "warning" : "optimal",
    statusLabel: weather === "hot" ? "Hot climate" : "Hydration target",
    progress: Math.min(100, Math.round((total / 4) * 100)),
    metrics: [
      { label: "Base needs", value: base, unit: "L" },
      { label: "Workout add-on", value: workout, unit: "L" },
      { label: "500ml bottles", value: bottles500 },
      { label: "250ml glasses", value: glasses250 },
    ],
    interpretation: `Drink about ${total} L of water daily (${round(total * 33.814, 0)} fl oz). That is roughly ${bottles500} bottles of 500 ml. Base: ${base} L + workout: ${workout} L${weather === "hot" ? " (increased for hot weather)" : ""}.`,
    chart: {
      type: "bar",
      data: [
        { label: "Base", value: base, color: "#3b82f6" },
        { label: "Workout", value: workout, color: "#06b6d4" },
        { label: "Total", value: total, color: "#2F6B4F" },
      ],
    },
  };
});
