import { getLatestArticles } from "@/features/articles/services";
import {
  DEMO_PROFILE,
  DEMO_USER_ID,
  RECOMMENDED_DIETS,
  RECOMMENDED_WORKOUTS,
  SAMPLE_ACTIVITY,
  SAMPLE_CALCULATOR_HISTORY,
  SAMPLE_DAILY_SUMMARY,
  SAMPLE_DIET_LOGS,
  SAMPLE_GOALS,
  SAMPLE_METRIC_SERIES,
  SAMPLE_NOTIFICATIONS,
  SAMPLE_SAVED,
  SAMPLE_WATER_LOGS,
  SAMPLE_WEIGHT_LOGS,
  SAMPLE_WORKOUT_LOGS,
} from "../data/sample";
import type {
  ActivityItem,
  CalculatorHistoryEntry,
  DailySummary,
  DashboardSnapshot,
  DietLogEntry,
  GoalEntry,
  GoalType,
  MetricId,
  MetricPoint,
  NotificationEntry,
  SavedItemEntry,
  SavedItemType,
  UserProfileData,
  WaterLogEntry,
  WeightLogEntry,
  WorkoutLogEntry,
} from "../types";
import { calcBmi } from "../utils";

/**
 * In-memory dashboard store — demo user until Auth.js + Prisma are wired.
 */
let profileStore: UserProfileData = { ...DEMO_PROFILE };
let weightLogs = [...SAMPLE_WEIGHT_LOGS];
const workoutLogs = [...SAMPLE_WORKOUT_LOGS];
let waterLogs = [...SAMPLE_WATER_LOGS];
const dietLogs = [...SAMPLE_DIET_LOGS];
const calculatorHistory = [...SAMPLE_CALCULATOR_HISTORY];
let goals = [...SAMPLE_GOALS];
let savedItems = [...SAMPLE_SAVED];
let notifications = [...SAMPLE_NOTIFICATIONS];
const metricSeries: Record<MetricId, MetricPoint[]> = {
  weight: [...SAMPLE_METRIC_SERIES.weight],
  bmi: [...SAMPLE_METRIC_SERIES.bmi],
  bodyFat: [...SAMPLE_METRIC_SERIES.bodyFat],
  calories: [...SAMPLE_METRIC_SERIES.calories],
  protein: [...SAMPLE_METRIC_SERIES.protein],
  water: [...SAMPLE_METRIC_SERIES.water],
  workouts: [...SAMPLE_METRIC_SERIES.workouts],
  steps: [...SAMPLE_METRIC_SERIES.steps],
  sleep: [...SAMPLE_METRIC_SERIES.sleep],
};
const activity = [...SAMPLE_ACTIVITY];

export async function getProfile(): Promise<UserProfileData> {
  return profileStore;
}

export async function updateProfile(patch: Partial<UserProfileData>): Promise<UserProfileData> {
  profileStore = { ...profileStore, ...patch, id: profileStore.id, userId: profileStore.userId };
  if (patch.weightKg !== undefined || patch.heightCm !== undefined) {
    const bmi = calcBmi(profileStore.weightKg, profileStore.heightCm);
    const today = new Date().toISOString().slice(0, 10);
    const series = metricSeries.bmi;
    const last = series[series.length - 1];
    if (last?.date === today) last.value = bmi;
    else metricSeries.bmi = [...series, { date: today, value: bmi }];
  }
  return profileStore;
}

export async function getDailySummary(): Promise<DailySummary> {
  return {
    ...SAMPLE_DAILY_SUMMARY,
    weightKg: profileStore.weightKg,
    bmi: calcBmi(profileStore.weightKg, profileStore.heightCm),
    waterMl: waterLogs
      .filter((l) => l.recordedAt.slice(0, 10) === SAMPLE_DAILY_SUMMARY.date)
      .reduce((s, l) => s + l.amountMl, 0),
  };
}

export async function getMetricSeries(
  metric: MetricId,
  range: "week" | "month" | "year" = "month",
): Promise<MetricPoint[]> {
  const all = metricSeries[metric] ?? [];
  if (range === "week") return all.slice(-7);
  if (range === "year") {
    // Aggregate demo: reuse monthly points as stand-in yearly trend
    return all;
  }
  return all;
}

export async function getWorkoutStreak(): Promise<number> {
  return 5;
}

export async function getGoals(): Promise<GoalEntry[]> {
  return goals.filter((g) => g.status !== "CANCELLED");
}

export async function createGoal(input: {
  type: GoalType;
  title: string;
  description?: string;
  metric: GoalEntry["metric"];
  startValue: number;
  targetValue: number;
  currentValue?: number;
  unit?: string;
  targetDate?: string;
}): Promise<GoalEntry> {
  const goal: GoalEntry = {
    id: `goal-${Date.now()}`,
    type: input.type,
    title: input.title,
    description: input.description,
    metric: input.metric,
    startValue: input.startValue,
    targetValue: input.targetValue,
    currentValue: input.currentValue ?? input.startValue,
    unit: input.unit,
    status: "ACTIVE",
    startDate: new Date().toISOString(),
    targetDate: input.targetDate,
  };
  goals = [goal, ...goals];
  return goal;
}

export async function getWeightLogs(): Promise<WeightLogEntry[]> {
  return [...weightLogs].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
  );
}

export async function addWeightLog(weightKg: number, note?: string): Promise<WeightLogEntry> {
  const entry: WeightLogEntry = {
    id: `wl-${Date.now()}`,
    weightKg,
    note,
    recordedAt: new Date().toISOString(),
  };
  weightLogs = [entry, ...weightLogs];
  profileStore = { ...profileStore, weightKg };
  const today = entry.recordedAt.slice(0, 10);
  const series = metricSeries.weight;
  const last = series[series.length - 1];
  if (last?.date === today) last.value = weightKg;
  else metricSeries.weight = [...series, { date: today, value: weightKg }];
  return entry;
}

export async function getWorkoutLogs(): Promise<WorkoutLogEntry[]> {
  return [...workoutLogs].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
  );
}

export async function getWaterLogs(): Promise<WaterLogEntry[]> {
  return [...waterLogs].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
  );
}

export async function addWaterLog(amountMl: number): Promise<WaterLogEntry> {
  const entry: WaterLogEntry = {
    id: `wa-${Date.now()}`,
    amountMl,
    recordedAt: new Date().toISOString(),
  };
  waterLogs = [entry, ...waterLogs];
  return entry;
}

export async function getDietLogs(): Promise<DietLogEntry[]> {
  return [...dietLogs].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
  );
}

export async function getCalculatorHistory(): Promise<CalculatorHistoryEntry[]> {
  return [...calculatorHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getSavedItems(type?: SavedItemType): Promise<SavedItemEntry[]> {
  const list = type ? savedItems.filter((s) => s.type === type) : savedItems;
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function unsaveItem(id: string): Promise<boolean> {
  const before = savedItems.length;
  savedItems = savedItems.filter((s) => s.id !== id);
  return savedItems.length < before;
}

export async function getNotifications(): Promise<NotificationEntry[]> {
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function markNotificationRead(id: string): Promise<void> {
  notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
}

export async function markAllNotificationsRead(): Promise<void> {
  notifications = notifications.map((n) => ({ ...n, read: true }));
}

export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  return activity.slice(0, limit);
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [summary, goalList, unread] = await Promise.all([
    getDailySummary(),
    getGoals(),
    getNotifications().then((n) => n.filter((x) => !x.read).length),
  ]);

  const primary = goalList.find((g) => g.status === "ACTIVE");
  const span = primary ? primary.targetValue - primary.startValue : 1;
  const todayGoalPct = primary
    ? Math.min(100, Math.max(0, ((primary.currentValue - primary.startValue) / (span || 1)) * 100))
    : 62;

  return {
    profile: profileStore,
    summary,
    streakDays: await getWorkoutStreak(),
    weeklyProgressPct: 72,
    monthlyProgressPct: 58,
    todayGoalLabel: primary?.title ?? "Stay consistent today",
    todayGoalPct: Number(todayGoalPct.toFixed(0)),
    recentActivity: await getRecentActivity(),
    goals: goalList,
    notificationsUnread: unread,
  };
}

export async function getLatestArticlesForDashboard(limit = 3) {
  return getLatestArticles(limit);
}

export function getRecommendedWorkouts() {
  return RECOMMENDED_WORKOUTS;
}

export function getRecommendedDiets() {
  return RECOMMENDED_DIETS;
}

export function getDemoUserId() {
  return DEMO_USER_ID;
}
