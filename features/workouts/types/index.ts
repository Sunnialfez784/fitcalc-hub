/**
 * Workout Planner — domain types
 */

export type WorkoutDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type WorkoutPublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type MuscleGroupId =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "legs"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "abs"
  | "core"
  | "neck"
  | "full-body";

export type EquipmentId =
  | "barbell"
  | "dumbbell"
  | "cable"
  | "machine"
  | "bodyweight"
  | "kettlebell"
  | "band"
  | "bench"
  | "pull-up-bar"
  | "none";

export type WorkoutGoalId =
  | "strength"
  | "hypertrophy"
  | "fat-loss"
  | "weight-gain"
  | "endurance"
  | "mobility"
  | "general-fitness";

export type FaqItem = { question: string; answer: string };

export type WorkoutCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
};

export type MuscleGroup = {
  id: MuscleGroupId;
  name: string;
  slug: string;
};

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  description: string;
  primaryMuscle: MuscleGroupId;
  secondaryMuscles: MuscleGroupId[];
  difficulty: WorkoutDifficulty;
  equipment: EquipmentId[];
  exerciseType: "compound" | "isolation" | "cardio" | "isometric";
  instructions: string[];
  commonMistakes: string[];
  tips: string[];
  benefits: string[];
  defaultSets: number;
  defaultReps: string;
  defaultRestSec: number;
  tempo?: string;
  caloriesPerMinute: number;
  videoUrl?: string;
  imageGradient: string;
  published: boolean;
};

export type WorkoutExerciseItem = {
  exerciseId: string;
  sets: number;
  reps: string;
  restSec: number;
  tempo?: string;
  notes?: string;
  sortOrder: number;
};

export type WorkoutDay = {
  dayNumber: number;
  title: string;
  focus?: string;
  notes?: string;
  isRestDay: boolean;
  planSlug?: string;
  exercises: WorkoutExerciseItem[];
};

export type WorkoutProgram = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverGradient: string;
  difficulty: WorkoutDifficulty;
  durationWeeks: number;
  daysPerWeek: number;
  sessionMinutes: number;
  equipment: EquipmentId[];
  goals: WorkoutGoalId[];
  targetMuscles: MuscleGroupId[];
  caloriesPerSession: number;
  featured: boolean;
  status: WorkoutPublishStatus;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  categoryId: string;
  faqs: FaqItem[];
  days: WorkoutDay[];
};

export type WorkoutPlan = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverGradient: string;
  difficulty: WorkoutDifficulty;
  durationMin: number;
  equipment: EquipmentId[];
  goals: WorkoutGoalId[];
  targetMuscles: MuscleGroupId[];
  caloriesBurned: number;
  featured: boolean;
  status: WorkoutPublishStatus;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  categoryId: string;
  programId?: string;
  faqs: FaqItem[];
  exercises: WorkoutExerciseItem[];
};

export type WorkoutListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  categorySlug?: string;
  muscle?: MuscleGroupId;
  goal?: WorkoutGoalId;
  equipment?: EquipmentId;
  difficulty?: WorkoutDifficulty;
  durationMax?: number;
  workoutType?: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type CreateExerciseInput = Omit<Exercise, "id" | "slug" | "published" | "imageGradient"> & {
  slug?: string;
  published?: boolean;
  imageGradient?: string;
};

export type CreatePlanInput = {
  title: string;
  slug?: string;
  excerpt: string;
  description: string;
  difficulty: WorkoutDifficulty;
  durationMin: number;
  equipment: EquipmentId[];
  goals: WorkoutGoalId[];
  targetMuscles: MuscleGroupId[];
  caloriesBurned?: number;
  categoryId: string;
  exercises: WorkoutExerciseItem[];
  status?: WorkoutPublishStatus;
  faqs?: FaqItem[];
};

export type CreateProgramInput = {
  title: string;
  slug?: string;
  excerpt: string;
  description: string;
  difficulty: WorkoutDifficulty;
  durationWeeks: number;
  daysPerWeek: number;
  sessionMinutes: number;
  equipment: EquipmentId[];
  goals: WorkoutGoalId[];
  targetMuscles: MuscleGroupId[];
  categoryId: string;
  days: WorkoutDay[];
  status?: WorkoutPublishStatus;
  faqs?: FaqItem[];
};

/** Future AI provider contract — implement without changing UI consumers. */
export type GeneratePlanAiInput = {
  goal: WorkoutGoalId;
  experience: WorkoutDifficulty;
  daysPerWeek: number;
  sessionMinutes: number;
  equipment: EquipmentId[];
  injuries?: string[];
  preferences?: string[];
};

export type WorkoutAiProvider = {
  generateCustomPlan(input: GeneratePlanAiInput): Promise<CreateProgramInput>;
  recommendExercises(input: {
    muscle: MuscleGroupId;
    equipment: EquipmentId[];
    limit?: number;
  }): Promise<Exercise[]>;
  suggestAdjustments(input: {
    programSlug: string;
    feedback: string;
  }): Promise<{ notes: string; dayTweaks: Partial<WorkoutDay>[] }>;
  suggestRecovery(input: { lastWorkoutSlug: string }): Promise<string[]>;
  analyzeProgress(input: {
    completedSessions: number;
    streakDays: number;
  }): Promise<{ summary: string; nextSteps: string[] }>;
};

export type UserWorkoutDashboard = {
  todaysWorkout: { title: string; href: string; focus?: string } | null;
  completedCount: number;
  streakDays: number;
  weeklyProgressPct: number;
  monthlyProgressPct: number;
  favoriteExercises: Exercise[];
  recommended: WorkoutProgram | null;
  recentHistory: Array<{ id: string; title: string; completedAt: string; href?: string }>;
};
