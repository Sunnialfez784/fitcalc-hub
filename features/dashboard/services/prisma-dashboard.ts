/**
 * Prisma-backed dashboard repository (admin / auth ready).
 * Use when DATABASE_URL is set and `pnpm db:generate` has been run.
 *
 * Cast used until the Prisma client is regenerated after schema changes
 * (Windows may lock the query engine while `next dev` is running).
 */

import { prisma } from "@/lib/prisma";
import type { GoalType, SavedItemType } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function prismaGetProfile(userId: string) {
  return db.userProfile.findUnique({ where: { userId } });
}

export async function prismaUpsertProfile(
  userId: string,
  data: {
    photoUrl?: string;
    heightCm?: number;
    weightKg?: number;
    gender?: string;
    dateOfBirth?: Date;
    activityLevel?: string;
    fitnessGoal?: string;
    unitSystem?: string;
  },
) {
  return db.userProfile.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}

export async function prismaAddWeightLog(userId: string, weightKg: number, note?: string) {
  return db.weightLog.create({
    data: { userId, weightKg, note },
  });
}

export async function prismaAddWaterLog(userId: string, amountMl: number) {
  return db.waterLog.create({ data: { userId, amountMl } });
}

export async function prismaAddWorkoutLog(
  userId: string,
  data: {
    title: string;
    workoutSlug?: string;
    durationMin?: number;
    caloriesBurn?: number;
    notes?: string;
  },
) {
  return db.workoutLog.create({ data: { userId, ...data } });
}

export async function prismaCreateGoal(
  userId: string,
  data: {
    type: GoalType;
    title: string;
    description?: string;
    metric: string;
    startValue: number;
    targetValue: number;
    currentValue: number;
    unit?: string;
    targetDate?: Date;
  },
) {
  return db.goal.create({ data: { userId, ...data } });
}

export async function prismaSaveItem(
  userId: string,
  data: {
    type: SavedItemType;
    itemId: string;
    title: string;
    href: string;
    imageUrl?: string;
  },
) {
  return db.savedItem.upsert({
    where: {
      userId_type_itemId: { userId, type: data.type, itemId: data.itemId },
    },
    create: { userId, ...data },
    update: { title: data.title, href: data.href, imageUrl: data.imageUrl },
  });
}

export async function prismaListNotifications(userId: string) {
  return db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
