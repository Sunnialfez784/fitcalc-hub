"use server";

import {
  addWaterLog,
  addWeightLog,
  createGoal,
  markAllNotificationsRead,
  markNotificationRead,
  unsaveItem,
  updateProfile,
} from "./services/dashboard";
import type { GoalType, UserProfileData } from "./types";

export async function actionUpdateProfile(patch: Partial<UserProfileData>) {
  return updateProfile(patch);
}

export async function actionAddWeight(weightKg: number, note?: string) {
  return addWeightLog(weightKg, note);
}

export async function actionAddWater(amountMl: number) {
  return addWaterLog(amountMl);
}

export async function actionCreateGoal(input: {
  type: GoalType;
  title: string;
  description?: string;
  metric: "weight" | "bodyFat" | "calories" | "protein" | "water" | "custom";
  startValue: number;
  targetValue: number;
  currentValue?: number;
  unit?: string;
  targetDate?: string;
}) {
  return createGoal(input);
}

export async function actionUnsave(id: string) {
  return unsaveItem(id);
}

export async function actionMarkNotificationRead(id: string) {
  return markNotificationRead(id);
}

export async function actionMarkAllNotificationsRead() {
  return markAllNotificationsRead();
}
