/**
 * Domain helpers — BMI, age, macros, calories, protein.
 * Used by formula modules; keep pure and side-effect free.
 */

import { round } from "./units";
import type { ResultRange, ResultStatus } from "../types";

// -----------------------------------------------------------------------------
// Age
// -----------------------------------------------------------------------------

/** Calculate age in full years from a birth date. */
export function calculateAge(birthDate: Date, asOf: Date = new Date()): number {
  let age = asOf.getFullYear() - birthDate.getFullYear();
  const monthDiff = asOf.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return Math.max(0, age);
}

// -----------------------------------------------------------------------------
// BMI
// -----------------------------------------------------------------------------

/** BMI = weight(kg) / height(m)² */
export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  if (heightM <= 0) return 0;
  return round(weightKg / (heightM * heightM), 1);
}

export const BMI_RANGES: ResultRange[] = [
  { id: "underweight", label: "Underweight", max: 18.5, status: "under", color: "#3b82f6" },
  { id: "normal", label: "Normal", min: 18.5, max: 25, status: "normal", color: "#22c55e" },
  { id: "overweight", label: "Overweight", min: 25, max: 30, status: "over", color: "#f59e0b" },
  { id: "obese", label: "Obese", min: 30, status: "warning", color: "#ef4444" },
];

export function getBmiCategory(bmi: number): ResultRange {
  if (bmi < 18.5) return BMI_RANGES[0];
  if (bmi < 25) return BMI_RANGES[1];
  if (bmi < 30) return BMI_RANGES[2];
  return BMI_RANGES[3];
}

export function matchRange(value: number, ranges: ResultRange[]): ResultRange | undefined {
  return ranges.find((r) => {
    const aboveMin = r.min === undefined || value >= r.min;
    const belowMax = r.max === undefined || value < r.max;
    return aboveMin && belowMax;
  });
}

export function statusToBadgeVariant(
  status?: ResultStatus,
): "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline" {
  switch (status) {
    case "normal":
    case "optimal":
      return "success";
    case "under":
      return "info";
    case "over":
      return "warning";
    case "warning":
      return "destructive";
    default:
      return "secondary";
  }
}

// -----------------------------------------------------------------------------
// BMR / TDEE (Mifflin-St Jeor)
// -----------------------------------------------------------------------------

export type Sex = "male" | "female";

export function calculateBmrMifflin(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return round(sex === "male" ? base + 5 : base - 161, 0);
}

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateTdee(bmr: number, activity: ActivityLevel): number {
  return round(bmr * ACTIVITY_MULTIPLIERS[activity], 0);
}

// -----------------------------------------------------------------------------
// Macros & protein
// -----------------------------------------------------------------------------

export type MacroSplit = {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
};

export type MacroGrams = {
  protein: number;
  carbs: number;
  fat: number;
};

/** Convert calorie % split into grams. */
export function caloriesToMacros(calories: number, split: MacroSplit): MacroGrams {
  return {
    protein: round((calories * (split.proteinPct / 100)) / 4, 0),
    carbs: round((calories * (split.carbsPct / 100)) / 4, 0),
    fat: round((calories * (split.fatPct / 100)) / 9, 0),
  };
}

/**
 * Protein recommendation (g/kg) by goal.
 * general: 0.8, maintain: 1.2, build: 1.6–2.2, cut: 1.8–2.4
 * Activity bumps the midpoint slightly for active / very_active.
 */
export function calculateProteinTarget(
  weightKg: number,
  goal: "general" | "maintain" | "build" | "cut" = "maintain",
  activity?: ActivityLevel,
): { min: number; max: number; recommended: number } {
  const ranges = {
    general: { min: 0.8, max: 1.0 },
    maintain: { min: 1.2, max: 1.6 },
    build: { min: 1.6, max: 2.2 },
    cut: { min: 1.8, max: 2.4 },
  } as const;

  const { min, max } = ranges[goal];
  let mid = (min + max) / 2;
  if (activity === "active") mid += 0.1;
  if (activity === "very_active") mid += 0.2;
  mid = Math.min(mid, max);

  const recommended = round(weightKg * mid, 0);
  return {
    min: round(weightKg * min, 0),
    max: round(weightKg * max, 0),
    recommended,
  };
}

/** Split daily protein across N meals (default 4). */
export function distributeProteinMeals(
  dailyGrams: number,
  meals = 4,
): Array<{ meal: string; grams: number }> {
  const perMeal = round(dailyGrams / meals, 0);
  const remainder = dailyGrams - perMeal * meals;
  return Array.from({ length: meals }, (_, i) => ({
    meal: `Meal ${i + 1}`,
    grams: i === 0 ? perMeal + remainder : perMeal,
  }));
}

/**
 * Daily water intake (liters).
 * Base ~33 ml/kg + 12 ml per exercise minute; climate multiplier.
 */
export function calculateWaterIntakeLiters(
  weightKg: number,
  exerciseMinutes = 0,
  climate: "cool" | "moderate" | "hot" = "moderate",
): { total: number; base: number; workout: number } {
  const climateMultiplier = { cool: 0.95, moderate: 1, hot: 1.15 }[climate];
  const base = weightKg * 0.033 * climateMultiplier;
  const workout = exerciseMinutes * 0.012 * climateMultiplier;
  return {
    base: round(base, 2),
    workout: round(workout, 2),
    total: round(base + workout, 2),
  };
}

/** Healthy weight range (kg) for BMI 18.5–24.9 at a given height. */
export function healthyWeightRangeKg(heightCm: number): { min: number; max: number } {
  const h = heightCm / 100;
  return {
    min: round(18.5 * h * h, 1),
    max: round(24.9 * h * h, 1),
  };
}

/** Ideal body weight (Devine formula) — height in cm. */
export function idealBodyWeightKg(heightCm: number, sex: Sex): number {
  const heightIn = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, heightIn - 60);
  if (sex === "male") {
    return round(50 + 2.3 * inchesOver5ft, 1);
  }
  return round(45.5 + 2.3 * inchesOver5ft, 1);
}

/** Progress % for gauge given value within [min, max]. */
export function progressPercent(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return round(clamp01(((value - min) / (max - min)) * 100), 0);
}

function clamp01(n: number): number {
  return Math.min(100, Math.max(0, n));
}
