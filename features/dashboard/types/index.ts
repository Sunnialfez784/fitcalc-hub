/**
 * Dashboard domain types — CMS/admin-ready.
 */

export type UnitSystem = "metric" | "imperial";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type FitnessGoalId =
  "lose_weight" | "gain_weight" | "gain_muscle" | "lose_fat" | "maintain" | "custom";

export type GoalType =
  "GAIN_WEIGHT" | "LOSE_WEIGHT" | "GAIN_MUSCLE" | "LOSE_FAT" | "MAINTAIN_WEIGHT" | "CUSTOM";

export type GoalStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "CANCELLED";

export type SavedItemType = "ARTICLE" | "CALCULATOR" | "WORKOUT" | "DIET" | "RECIPE";

export type NotificationType =
  "workout_reminder" | "water_reminder" | "goal_reminder" | "system" | "progress";

/** Extensible tracking metric id — register new ones in metrics/registry.ts */
export type MetricId =
  "weight" | "bmi" | "bodyFat" | "calories" | "protein" | "water" | "workouts" | "steps" | "sleep";

export type UserProfileData = {
  id: string;
  userId: string;
  name: string;
  email: string;
  photoUrl?: string;
  heightCm: number;
  weightKg: number;
  gender: string;
  dateOfBirth: string;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoalId;
  unitSystem: UnitSystem;
  bio?: string;
};

export type MetricPoint = {
  date: string; // ISO date (day)
  value: number;
};

export type WeightLogEntry = {
  id: string;
  weightKg: number;
  note?: string;
  recordedAt: string;
};

export type WorkoutLogEntry = {
  id: string;
  title: string;
  workoutSlug?: string;
  durationMin?: number;
  caloriesBurn?: number;
  notes?: string;
  completedAt: string;
};

export type WaterLogEntry = {
  id: string;
  amountMl: number;
  recordedAt: string;
};

export type DietLogEntry = {
  id: string;
  title: string;
  dietSlug?: string;
  calories?: number;
  proteinG?: number;
  notes?: string;
  recordedAt: string;
};

export type CalculatorHistoryEntry = {
  id: string;
  type: string;
  label: string;
  summary: string;
  href?: string;
  createdAt: string;
};

export type GoalEntry = {
  id: string;
  type: GoalType;
  title: string;
  description?: string;
  metric: MetricId | "custom";
  startValue: number;
  targetValue: number;
  currentValue: number;
  unit?: string;
  status: GoalStatus;
  startDate: string;
  targetDate?: string;
  completedAt?: string;
};

export type SavedItemEntry = {
  id: string;
  type: SavedItemType;
  itemId: string;
  title: string;
  href: string;
  imageUrl?: string;
  subtitle?: string;
  createdAt: string;
};

export type NotificationEntry = {
  id: string;
  title: string;
  body?: string;
  type: NotificationType;
  read: boolean;
  href?: string;
  createdAt: string;
};

export type ActivityItem = {
  id: string;
  label: string;
  detail: string;
  href?: string;
  at: string;
  kind: "workout" | "water" | "weight" | "calculator" | "goal" | "diet";
};

export type DailySummary = {
  date: string;
  calories: number;
  caloriesGoal: number;
  proteinG: number;
  proteinGoal: number;
  waterMl: number;
  waterGoal: number;
  workoutsDone: number;
  steps: number;
  sleepHours: number;
  weightKg: number;
  bmi: number;
};

export type DashboardSnapshot = {
  profile: UserProfileData;
  summary: DailySummary;
  streakDays: number;
  weeklyProgressPct: number;
  monthlyProgressPct: number;
  todayGoalLabel: string;
  todayGoalPct: number;
  recentActivity: ActivityItem[];
  goals: GoalEntry[];
  notificationsUnread: number;
};
