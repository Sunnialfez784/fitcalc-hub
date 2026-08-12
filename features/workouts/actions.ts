"use server";

import { markWorkoutComplete, toggleBookmark, toggleFavoriteExercise } from "./services/workouts";

export async function actionToggleBookmark(key: string) {
  return toggleBookmark(key);
}

export async function actionToggleFavorite(exerciseId: string) {
  return toggleFavoriteExercise(exerciseId);
}

export async function actionMarkComplete(input: { title: string; href?: string }) {
  return markWorkoutComplete(input);
}
