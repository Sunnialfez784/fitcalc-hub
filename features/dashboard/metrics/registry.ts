import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Beef,
  Droplets,
  Dumbbell,
  Flame,
  Footprints,
  Moon,
  Scale,
  Percent,
} from "lucide-react";
import type { MetricId } from "../types";

/**
 * Tracking metric registry — add a new module by registering here.
 * Dashboard cards/charts/history read from this config; no shell changes needed.
 */
export type MetricDefinition = {
  id: MetricId;
  label: string;
  shortLabel: string;
  unit: string;
  description: string;
  icon: LucideIcon;
  /** Chart color token (CSS-friendly) */
  color: string;
  /** Whether this metric appears on the home dashboard as a primary card */
  dashboardCard: boolean;
  /** History tab key */
  historyKey: string;
};

export const TRACKING_METRICS: MetricDefinition[] = [
  {
    id: "weight",
    label: "Weight",
    shortLabel: "Weight",
    unit: "kg",
    description: "Body weight over time",
    icon: Scale,
    color: "oklch(0.55 0.14 155)",
    dashboardCard: true,
    historyKey: "weight",
  },
  {
    id: "bmi",
    label: "BMI",
    shortLabel: "BMI",
    unit: "",
    description: "Body mass index",
    icon: Activity,
    color: "oklch(0.55 0.12 250)",
    dashboardCard: true,
    historyKey: "bmi",
  },
  {
    id: "bodyFat",
    label: "Body Fat %",
    shortLabel: "Body Fat",
    unit: "%",
    description: "Estimated body fat percentage",
    icon: Percent,
    color: "oklch(0.6 0.14 30)",
    dashboardCard: false,
    historyKey: "bodyFat",
  },
  {
    id: "calories",
    label: "Calories",
    shortLabel: "Calories",
    unit: "kcal",
    description: "Daily calorie intake",
    icon: Flame,
    color: "oklch(0.65 0.15 55)",
    dashboardCard: true,
    historyKey: "calories",
  },
  {
    id: "protein",
    label: "Protein Intake",
    shortLabel: "Protein",
    unit: "g",
    description: "Daily protein grams",
    icon: Beef,
    color: "oklch(0.55 0.16 25)",
    dashboardCard: true,
    historyKey: "protein",
  },
  {
    id: "water",
    label: "Water Intake",
    shortLabel: "Water",
    unit: "ml",
    description: "Hydration tracking",
    icon: Droplets,
    color: "oklch(0.6 0.12 220)",
    dashboardCard: true,
    historyKey: "water",
  },
  {
    id: "workouts",
    label: "Workout Sessions",
    shortLabel: "Workouts",
    unit: "sessions",
    description: "Completed training sessions",
    icon: Dumbbell,
    color: "oklch(0.55 0.14 300)",
    dashboardCard: false,
    historyKey: "workouts",
  },
  {
    id: "steps",
    label: "Steps",
    shortLabel: "Steps",
    unit: "steps",
    description: "Daily step count",
    icon: Footprints,
    color: "oklch(0.55 0.1 145)",
    dashboardCard: false,
    historyKey: "steps",
  },
  {
    id: "sleep",
    label: "Sleep Hours",
    shortLabel: "Sleep",
    unit: "h",
    description: "Nightly sleep duration",
    icon: Moon,
    color: "oklch(0.5 0.1 280)",
    dashboardCard: false,
    historyKey: "sleep",
  },
];

const byId = new Map(TRACKING_METRICS.map((m) => [m.id, m]));

export function getMetric(id: MetricId): MetricDefinition {
  const m = byId.get(id);
  if (!m) throw new Error(`Unknown metric: ${id}`);
  return m;
}

export function listDashboardCardMetrics(): MetricDefinition[] {
  return TRACKING_METRICS.filter((m) => m.dashboardCard);
}

export function listAllMetrics(): MetricDefinition[] {
  return TRACKING_METRICS;
}

/** Register additional metrics at runtime (future plugins / admin modules). */
export function registerMetric(def: MetricDefinition) {
  if (byId.has(def.id)) return;
  TRACKING_METRICS.push(def);
  byId.set(def.id, def);
}
