/**
 * Future AI integration — swap `noopWorkoutAi` for a real provider
 * (OpenAI, Anthropic, custom) without changing page components.
 */

import { SAMPLE_EXERCISES } from "../data/exercises";
import type { CreateProgramInput, WorkoutAiProvider } from "../types";

export const noopWorkoutAi: WorkoutAiProvider = {
  async generateCustomPlan(input): Promise<CreateProgramInput> {
    throw new Error(
      `AI plan generation is not enabled yet. Requested goal=${input.goal}, days=${input.daysPerWeek}. Wire WorkoutAiProvider.`,
    );
  },
  async recommendExercises({ muscle, equipment, limit = 5 }) {
    return SAMPLE_EXERCISES.filter(
      (e) =>
        e.primaryMuscle === muscle &&
        e.equipment.some((eq) => equipment.includes(eq) || eq === "bodyweight"),
    ).slice(0, limit);
  },
  async suggestAdjustments() {
    return {
      notes: "AI adjustments coming soon — reduce volume by 1 set if sore.",
      dayTweaks: [],
    };
  },
  async suggestRecovery() {
    return [
      "Sleep 7–9 hours",
      "Hit daily protein target",
      "Take a 20-minute easy walk",
      "Foam roll training muscles",
    ];
  },
  async analyzeProgress({ completedSessions, streakDays }) {
    return {
      summary: `You've completed ${completedSessions} sessions with a ${streakDays}-day streak.`,
      nextSteps: [
        "Add 2.5–5 lb when you top the rep range",
        "Deload every 4–6 weeks",
        "Log RPE for main lifts",
      ],
    };
  },
};

let activeAi: WorkoutAiProvider = noopWorkoutAi;

export function getWorkoutAi(): WorkoutAiProvider {
  return activeAi;
}

/** Call from app bootstrap when an AI backend is ready. */
export function registerWorkoutAi(provider: WorkoutAiProvider) {
  activeAi = provider;
}
