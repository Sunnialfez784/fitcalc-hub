import type {
  CalculatorHistoryEntry,
  DailySummary,
  DietLogEntry,
  GoalEntry,
  MetricId,
  MetricPoint,
  NotificationEntry,
  SavedItemEntry,
  UserProfileData,
  WaterLogEntry,
  WeightLogEntry,
  WorkoutLogEntry,
  ActivityItem,
} from "../types";

export const DEMO_USER_ID = "demo-user-1";

export const DEMO_PROFILE: UserProfileData = {
  id: "profile-demo-1",
  userId: DEMO_USER_ID,
  name: "Alex Rivera",
  email: "alex@fitcalchub.demo",
  photoUrl: undefined,
  heightCm: 175,
  weightKg: 78.2,
  gender: "male",
  dateOfBirth: "1994-04-12",
  activityLevel: "moderate",
  fitnessGoal: "gain_muscle",
  unitSystem: "metric",
  bio: "Building strength one progressive overload at a time.",
};

function daysAgo(n: number, hour = 8): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

/** Seed series for charts — last 30 days */
function series(base: number, variance: number, trend = 0): MetricPoint[] {
  const points: MetricPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * variance * 0.5;
    const value = Number((base + noise + trend * (29 - i)).toFixed(2));
    points.push({ date: dayKey(daysAgo(i)), value });
  }
  return points;
}

export const SAMPLE_METRIC_SERIES: Record<MetricId, MetricPoint[]> = {
  weight: series(79.5, 0.6, -0.04),
  bmi: series(25.9, 0.2, -0.015),
  bodyFat: series(18.5, 0.4, -0.03),
  calories: series(2200, 180, 0),
  protein: series(145, 25, 0.2),
  water: series(2400, 400, 20),
  workouts: series(1, 0.6, 0).map((p) => ({ ...p, value: Math.max(0, Math.round(p.value)) })),
  steps: series(8500, 1500, 30),
  sleep: series(7.2, 0.8, 0),
};

export const SAMPLE_WEIGHT_LOGS: WeightLogEntry[] = Array.from({ length: 14 }, (_, i) => ({
  id: `wl-${i}`,
  weightKg: Number((79.5 - i * 0.08 + (i % 3) * 0.1).toFixed(1)),
  note: i === 0 ? "Morning weigh-in" : undefined,
  recordedAt: daysAgo(13 - i, 7),
})).reverse();

export const SAMPLE_WORKOUT_LOGS: WorkoutLogEntry[] = [
  {
    id: "wo-1",
    title: "Push Day — Chest & Shoulders",
    workoutSlug: "push-pull-legs",
    durationMin: 55,
    caloriesBurn: 420,
    completedAt: daysAgo(0, 18),
  },
  {
    id: "wo-2",
    title: "Pull Day — Back & Biceps",
    workoutSlug: "push-pull-legs",
    durationMin: 60,
    caloriesBurn: 450,
    completedAt: daysAgo(2, 17),
  },
  {
    id: "wo-3",
    title: "Legs — Squats & Hinges",
    workoutSlug: "beginner-gym-routine",
    durationMin: 50,
    caloriesBurn: 480,
    completedAt: daysAgo(4, 19),
  },
  {
    id: "wo-4",
    title: "Full Body Beginner",
    workoutSlug: "beginner-gym-routine",
    durationMin: 40,
    caloriesBurn: 320,
    completedAt: daysAgo(6, 8),
  },
];

export const SAMPLE_WATER_LOGS: WaterLogEntry[] = [
  { id: "wa-1", amountMl: 500, recordedAt: daysAgo(0, 8) },
  { id: "wa-2", amountMl: 350, recordedAt: daysAgo(0, 11) },
  { id: "wa-3", amountMl: 500, recordedAt: daysAgo(0, 14) },
  { id: "wa-4", amountMl: 400, recordedAt: daysAgo(0, 16) },
  { id: "wa-5", amountMl: 500, recordedAt: daysAgo(1, 9) },
  { id: "wa-6", amountMl: 750, recordedAt: daysAgo(1, 15) },
];

export const SAMPLE_DIET_LOGS: DietLogEntry[] = [
  {
    id: "dl-1",
    title: "High-protein breakfast",
    calories: 520,
    proteinG: 42,
    recordedAt: daysAgo(0, 9),
  },
  {
    id: "dl-2",
    title: "Weight gain lunch bowl",
    dietSlug: "weight-gain-diet-plan",
    calories: 780,
    proteinG: 48,
    recordedAt: daysAgo(0, 13),
  },
  {
    id: "dl-3",
    title: "Fat loss dinner",
    dietSlug: "fat-loss-diet-plan",
    calories: 610,
    proteinG: 45,
    recordedAt: daysAgo(1, 19),
  },
];

export const SAMPLE_CALCULATOR_HISTORY: CalculatorHistoryEntry[] = [
  {
    id: "ch-1",
    type: "bmi",
    label: "BMI Calculator",
    summary: "BMI 25.5 — Overweight",
    href: "/calculators/bmi",
    createdAt: daysAgo(0, 10),
  },
  {
    id: "ch-2",
    type: "tdee",
    label: "TDEE Calculator",
    summary: "2,450 kcal maintenance",
    href: "/calculators/tdee",
    createdAt: daysAgo(1, 12),
  },
  {
    id: "ch-3",
    type: "protein",
    label: "Protein Calculator",
    summary: "155 g / day target",
    href: "/calculators/protein",
    createdAt: daysAgo(3, 15),
  },
  {
    id: "ch-4",
    type: "water",
    label: "Water Intake",
    summary: "3.1 L recommended",
    href: "/calculators/water-intake",
    createdAt: daysAgo(5, 9),
  },
];

export const SAMPLE_GOALS: GoalEntry[] = [
  {
    id: "goal-1",
    type: "GAIN_MUSCLE",
    title: "Reach 80 kg lean mass phase",
    description: "Slow surplus while keeping body fat under control.",
    metric: "weight",
    startValue: 76,
    targetValue: 80,
    currentValue: 78.2,
    unit: "kg",
    status: "ACTIVE",
    startDate: daysAgo(45),
    targetDate: daysAgo(-60),
  },
  {
    id: "goal-2",
    type: "CUSTOM",
    title: "Hit 160g protein daily",
    metric: "protein",
    startValue: 110,
    targetValue: 160,
    currentValue: 148,
    unit: "g",
    status: "ACTIVE",
    startDate: daysAgo(20),
    targetDate: daysAgo(-10),
  },
  {
    id: "goal-3",
    type: "LOSE_FAT",
    title: "Body fat to 15%",
    metric: "bodyFat",
    startValue: 19,
    targetValue: 15,
    currentValue: 17.8,
    unit: "%",
    status: "ACTIVE",
    startDate: daysAgo(30),
    targetDate: daysAgo(-90),
  },
];

export const SAMPLE_SAVED: SavedItemEntry[] = [
  {
    id: "sv-1",
    type: "ARTICLE",
    itemId: "creatine-guide",
    title: "Creatine Guide",
    href: "/blog/creatine-guide",
    subtitle: "Supplements",
    createdAt: daysAgo(2),
  },
  {
    id: "sv-2",
    type: "CALCULATOR",
    itemId: "tdee",
    title: "TDEE Calculator",
    href: "/calculators/tdee",
    subtitle: "Energy",
    createdAt: daysAgo(4),
  },
  {
    id: "sv-3",
    type: "WORKOUT",
    itemId: "push-pull-legs",
    title: "Push Pull Legs Workout",
    href: "/workouts",
    subtitle: "Intermediate",
    createdAt: daysAgo(6),
  },
  {
    id: "sv-4",
    type: "DIET",
    itemId: "weight-gain-diet-plan",
    title: "Weight Gain Diet Plan",
    href: "/diet-plans",
    subtitle: "Nutrition",
    createdAt: daysAgo(8),
  },
  {
    id: "sv-5",
    type: "RECIPE",
    itemId: "protein-oats",
    title: "High-Protein Overnight Oats",
    href: "/recipes",
    subtitle: "Breakfast",
    createdAt: daysAgo(10),
  },
];

export const SAMPLE_NOTIFICATIONS: NotificationEntry[] = [
  {
    id: "n-1",
    title: "Workout reminder",
    body: "Push day is scheduled for this evening.",
    type: "workout_reminder",
    read: false,
    href: "/dashboard/progress",
    createdAt: daysAgo(0, 7),
  },
  {
    id: "n-2",
    title: "Water reminder",
    body: "You're 650 ml short of today's hydration goal.",
    type: "water_reminder",
    read: false,
    href: "/dashboard/progress",
    createdAt: daysAgo(0, 14),
  },
  {
    id: "n-3",
    title: "Goal check-in",
    body: "You're 55% toward your 80 kg goal — keep the surplus consistent.",
    type: "goal_reminder",
    read: true,
    href: "/dashboard/progress",
    createdAt: daysAgo(1, 9),
  },
  {
    id: "n-4",
    title: "Weekly summary ready",
    body: "Review your weekly progress and streak.",
    type: "system",
    read: true,
    href: "/dashboard",
    createdAt: daysAgo(2, 8),
  },
];

export const SAMPLE_DAILY_SUMMARY: DailySummary = {
  date: dayKey(new Date().toISOString()),
  calories: 2140,
  caloriesGoal: 2450,
  proteinG: 148,
  proteinGoal: 160,
  waterMl: 1750,
  waterGoal: 3000,
  workoutsDone: 1,
  steps: 9240,
  sleepHours: 7.5,
  weightKg: 78.2,
  bmi: 25.5,
};

export const SAMPLE_ACTIVITY: ActivityItem[] = [
  {
    id: "act-1",
    label: "Completed workout",
    detail: "Push Day — 55 min",
    href: "/dashboard/history",
    at: daysAgo(0, 18),
    kind: "workout",
  },
  {
    id: "act-2",
    label: "Logged water",
    detail: "+400 ml",
    at: daysAgo(0, 16),
    kind: "water",
  },
  {
    id: "act-3",
    label: "Ran BMI calculator",
    detail: "BMI 25.5",
    href: "/calculators/bmi",
    at: daysAgo(0, 10),
    kind: "calculator",
  },
  {
    id: "act-4",
    label: "Weight logged",
    detail: "78.2 kg",
    at: daysAgo(0, 7),
    kind: "weight",
  },
];

export const RECOMMENDED_WORKOUTS = [
  {
    title: "Push Pull Legs",
    href: "/workouts",
    meta: "6 days · Intermediate",
    gradient: "from-emerald-500/30 to-teal-500/10",
  },
  {
    title: "Beginner Gym Routine",
    href: "/workouts",
    meta: "3 days · Beginner",
    gradient: "from-blue-500/30 to-cyan-500/10",
  },
  {
    title: "Full Body Strength",
    href: "/workouts",
    meta: "3 days · All levels",
    gradient: "from-violet-500/25 to-fuchsia-500/10",
  },
];

export const RECOMMENDED_DIETS = [
  {
    title: "Weight Gain Diet Plan",
    href: "/diet-plans",
    meta: "Surplus · High protein",
    gradient: "from-amber-500/30 to-orange-500/10",
  },
  {
    title: "Fat Loss Diet Plan",
    href: "/diet-plans",
    meta: "Deficit · Sustainable",
    gradient: "from-rose-500/25 to-pink-500/10",
  },
  {
    title: "High Protein Maintenance",
    href: "/diet-plans",
    meta: "Recomp friendly",
    gradient: "from-emerald-500/25 to-lime-500/10",
  },
];
