import { SAMPLE_EXERCISES, getExerciseMap } from "../data/exercises";
import { SAMPLE_PLANS, SAMPLE_PROGRAMS } from "../data/programs";
import { MUSCLE_GROUPS, WORKOUT_CATEGORIES } from "../data/taxonomy";
import type {
  CreatePlanInput,
  CreateProgramInput,
  Exercise,
  Paginated,
  UserWorkoutDashboard,
  WorkoutCategory,
  WorkoutListParams,
  WorkoutPlan,
  WorkoutProgram,
} from "../types";
import { slugify } from "../utils";

let plansStore = [...SAMPLE_PLANS];
let programsStore = [...SAMPLE_PROGRAMS];
let exercisesStore = [...SAMPLE_EXERCISES];
let categoriesStore = [...WORKOUT_CATEGORIES];

const bookmarks = new Set<string>();
const favorites = new Set<string>(["ex-barbell-bench-press", "ex-hip-thrust", "ex-pull-up"]);
let completed: Array<{ id: string; title: string; completedAt: string; href?: string }> = [
  {
    id: "wh-1",
    title: "Push Day — Hypertrophy",
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    href: "/workouts/push-day-hypertrophy",
  },
  {
    id: "wh-2",
    title: "Pull Day — Strength",
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    href: "/workouts/pull-day-strength",
  },
];
let streakDays = 5;
let weeklyPct = 70;
let monthlyPct = 55;

function publishedPlans() {
  return plansStore.filter((p) => p.published && p.status === "PUBLISHED");
}
function publishedPrograms() {
  return programsStore.filter((p) => p.published && p.status === "PUBLISHED");
}

function matchesFilters<T extends WorkoutPlan | WorkoutProgram>(
  item: T,
  params: WorkoutListParams,
): boolean {
  const { query, categorySlug, muscle, goal, equipment, difficulty, durationMax } = params;

  if (difficulty && item.difficulty !== difficulty) return false;
  if (goal && !item.goals.includes(goal)) return false;
  if (equipment && !item.equipment.includes(equipment)) return false;
  if (muscle && !item.targetMuscles.includes(muscle) && !item.targetMuscles.includes("full-body"))
    return false;
  if (categorySlug) {
    const cat = categoriesStore.find((c) => c.slug === categorySlug);
    if (!cat || item.categoryId !== cat.id) return false;
  }
  if (durationMax) {
    const dur = "durationMin" in item ? item.durationMin : (item as WorkoutProgram).sessionMinutes;
    if (dur > durationMax) return false;
  }
  if (query?.trim()) {
    const q = query.toLowerCase();
    const hay =
      `${item.title} ${item.excerpt} ${item.description} ${item.goals.join(" ")} ${item.equipment.join(" ")} ${item.targetMuscles.join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function paginate<T>(list: T[], page: number, pageSize: number): Paginated<T> {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages,
  };
}

export async function listCategories(): Promise<WorkoutCategory[]> {
  return [...categoriesStore].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string) {
  return categoriesStore.find((c) => c.slug === slug) ?? null;
}

export async function listMuscleGroups() {
  return MUSCLE_GROUPS;
}

export async function listExercises(
  params: {
    muscle?: string;
    equipment?: string;
    query?: string;
    page?: number;
    pageSize?: number;
  } = {},
) {
  let list = exercisesStore.filter((e) => e.published);
  if (params.muscle) list = list.filter((e) => e.primaryMuscle === params.muscle);
  if (params.equipment)
    list = list.filter((e) =>
      e.equipment.includes(params.equipment as Exercise["equipment"][number]),
    );
  if (params.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    );
  }
  return paginate(list, params.page ?? 1, params.pageSize ?? 24);
}

export async function getExerciseBySlug(slug: string) {
  return exercisesStore.find((e) => e.slug === slug) ?? null;
}

export async function listPlans(params: WorkoutListParams = {}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 9;
  const list = publishedPlans().filter((p) => matchesFilters(p, params));
  return paginate(list, page, pageSize);
}

export async function getPlanBySlug(slug: string) {
  return publishedPlans().find((p) => p.slug === slug) ?? null;
}

export async function listPrograms(params: WorkoutListParams = {}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 9;
  const list = publishedPrograms().filter((p) => matchesFilters(p, params));
  return paginate(list, page, pageSize);
}

export async function getProgramBySlug(slug: string) {
  return publishedPrograms().find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedPrograms(limit = 6) {
  return publishedPrograms()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export async function getRelatedPrograms(slug: string, limit = 3) {
  const current = await getProgramBySlug(slug);
  if (!current) return publishedPrograms().slice(0, limit);
  return publishedPrograms()
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: WorkoutProgram) =>
        (p.categoryId === current.categoryId ? 2 : 0) +
        p.goals.filter((g) => current.goals.includes(g)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export async function getRelatedPlans(slug: string, limit = 3) {
  const current = await getPlanBySlug(slug);
  if (!current) return publishedPlans().slice(0, limit);
  return publishedPlans()
    .filter((p) => p.slug !== slug)
    .filter(
      (p) =>
        p.categoryId === current.categoryId ||
        p.targetMuscles.some((m) => current.targetMuscles.includes(m)),
    )
    .slice(0, limit);
}

export async function getAllPlanSlugs() {
  return publishedPlans().map((p) => p.slug);
}

export async function getAllProgramSlugs() {
  return publishedPrograms().map((p) => p.slug);
}

export async function resolveExercises(items: WorkoutPlan["exercises"]) {
  const map = getExerciseMap();
  const live = new Map(exercisesStore.map((e) => [e.id, e]));
  return items
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => {
      const exercise = live.get(item.exerciseId) ?? map.get(item.exerciseId);
      if (!exercise) return null;
      return { ...item, exercise };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

// User actions (demo user)
export async function toggleBookmark(key: string) {
  if (bookmarks.has(key)) bookmarks.delete(key);
  else bookmarks.add(key);
  return bookmarks.has(key);
}

export async function isBookmarked(key: string) {
  return bookmarks.has(key);
}

export async function toggleFavoriteExercise(exerciseId: string) {
  if (favorites.has(exerciseId)) favorites.delete(exerciseId);
  else favorites.add(exerciseId);
  return favorites.has(exerciseId);
}

export async function markWorkoutComplete(input: { title: string; href?: string }) {
  completed = [
    {
      id: `wh-${Date.now()}`,
      title: input.title,
      href: input.href,
      completedAt: new Date().toISOString(),
    },
    ...completed,
  ];
  streakDays += 1;
  weeklyPct = Math.min(100, weeklyPct + 10);
  monthlyPct = Math.min(100, monthlyPct + 4);
  return completed[0];
}

export async function getUserWorkoutDashboard(): Promise<UserWorkoutDashboard> {
  const programs = publishedPrograms();
  const recommended = programs.find((p) => p.featured) ?? programs[0] ?? null;
  const todays = recommended?.days.find((d) => !d.isRestDay) ?? null;

  return {
    todaysWorkout: todays
      ? {
          title: todays.title,
          focus: todays.focus,
          href: todays.planSlug
            ? `/workouts/${todays.planSlug}`
            : `/workouts/program/${recommended!.slug}`,
        }
      : null,
    completedCount: completed.length,
    streakDays,
    weeklyProgressPct: weeklyPct,
    monthlyProgressPct: monthlyPct,
    favoriteExercises: exercisesStore.filter((e) => favorites.has(e.id)),
    recommended,
    recentHistory: completed.slice(0, 8),
  };
}

// Admin-ready mutations
export async function createPlan(input: CreatePlanInput): Promise<WorkoutPlan> {
  const slug = input.slug || slugify(input.title);
  const now = new Date().toISOString();
  const plan: WorkoutPlan = {
    id: `plan-${slug}`,
    title: input.title,
    slug,
    excerpt: input.excerpt,
    description: input.description,
    coverGradient: "from-primary/30 to-emerald-500/10",
    difficulty: input.difficulty,
    durationMin: input.durationMin,
    equipment: input.equipment,
    goals: input.goals,
    targetMuscles: input.targetMuscles,
    caloriesBurned: input.caloriesBurned ?? 350,
    featured: false,
    status: input.status ?? "DRAFT",
    published: input.status === "PUBLISHED",
    publishedAt: now,
    updatedAt: now,
    categoryId: input.categoryId,
    faqs: input.faqs ?? [],
    exercises: input.exercises,
  };
  plansStore = [plan, ...plansStore];
  return plan;
}

export async function updatePlan(slug: string, patch: Partial<WorkoutPlan>) {
  const i = plansStore.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  plansStore[i] = { ...plansStore[i], ...patch, updatedAt: new Date().toISOString() };
  return plansStore[i];
}

export async function deletePlan(slug: string) {
  const before = plansStore.length;
  plansStore = plansStore.filter((p) => p.slug !== slug);
  return plansStore.length < before;
}

export async function publishPlan(slug: string) {
  return updatePlan(slug, {
    status: "PUBLISHED",
    published: true,
    publishedAt: new Date().toISOString(),
  });
}

export async function createProgram(input: CreateProgramInput): Promise<WorkoutProgram> {
  const slug = input.slug || slugify(input.title);
  const now = new Date().toISOString();
  const program: WorkoutProgram = {
    id: `prog-${slug}`,
    title: input.title,
    slug,
    excerpt: input.excerpt,
    description: input.description,
    coverGradient: "from-primary/30 to-teal-500/10",
    difficulty: input.difficulty,
    durationWeeks: input.durationWeeks,
    daysPerWeek: input.daysPerWeek,
    sessionMinutes: input.sessionMinutes,
    equipment: input.equipment,
    goals: input.goals,
    targetMuscles: input.targetMuscles,
    caloriesPerSession: 400,
    featured: false,
    status: input.status ?? "DRAFT",
    published: input.status === "PUBLISHED",
    publishedAt: now,
    updatedAt: now,
    categoryId: input.categoryId,
    faqs: input.faqs ?? [],
    days: input.days,
  };
  programsStore = [program, ...programsStore];
  return program;
}

export async function updateProgram(slug: string, patch: Partial<WorkoutProgram>) {
  const i = programsStore.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  programsStore[i] = { ...programsStore[i], ...patch, updatedAt: new Date().toISOString() };
  return programsStore[i];
}

export async function deleteProgram(slug: string) {
  const before = programsStore.length;
  programsStore = programsStore.filter((p) => p.slug !== slug);
  return programsStore.length < before;
}

export async function publishProgram(slug: string) {
  return updateProgram(slug, {
    status: "PUBLISHED",
    published: true,
    publishedAt: new Date().toISOString(),
  });
}

export async function createCategory(input: Omit<WorkoutCategory, "id">) {
  const cat: WorkoutCategory = { ...input, id: `wcat-${input.slug}` };
  categoriesStore = [...categoriesStore, cat];
  return cat;
}

export async function createExercise(
  input: Omit<Exercise, "id" | "published" | "imageGradient"> & { slug?: string },
) {
  const slug = input.slug || slugify(input.name);
  const exercise: Exercise = {
    ...input,
    id: `ex-${slug}`,
    slug,
    published: true,
    imageGradient: "from-primary/30 to-transparent",
  };
  exercisesStore = [exercise, ...exercisesStore];
  return exercise;
}
