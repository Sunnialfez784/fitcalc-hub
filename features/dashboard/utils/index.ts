import type { GoalEntry } from "../types";

export function calcBmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  if (m <= 0) return 0;
  return Number((weightKg / (m * m)).toFixed(1));
}

/** Progress 0–100 toward goal (handles increase & decrease targets). */
export function goalProgressPct(goal: GoalEntry): number {
  const span = goal.targetValue - goal.startValue;
  if (span === 0) {
    return goal.currentValue === goal.targetValue ? 100 : 0;
  }
  const raw = ((goal.currentValue - goal.startValue) / span) * 100;
  return Math.min(100, Math.max(0, Number(raw.toFixed(1))));
}

export function estimateCompletionDate(goal: GoalEntry): string | null {
  if (!goal.targetDate) return null;
  const pct = goalProgressPct(goal);
  if (pct >= 100) return goal.completedAt ?? new Date().toISOString();
  if (pct <= 0) return goal.targetDate;

  const start = new Date(goal.startDate).getTime();
  const now = Date.now();
  const elapsed = Math.max(1, now - start);
  const totalNeeded = elapsed / (pct / 100);
  const eta = new Date(start + totalNeeded);
  return eta.toISOString();
}

export function formatDashboardDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function pctOf(value: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((value / goal) * 100));
}
