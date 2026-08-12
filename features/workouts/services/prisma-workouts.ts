/**
 * Prisma stubs for workout CMS (admin / auth ready).
 * Cast used until prisma generate picks up new models.
 */

import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function prismaCreateExercise(data: Record<string, unknown>) {
  return db.exercise.create({ data });
}

export async function prismaUpdateExercise(slug: string, data: Record<string, unknown>) {
  return db.exercise.update({ where: { slug }, data });
}

export async function prismaDeleteExercise(slug: string) {
  return db.exercise.delete({ where: { slug } });
}

export async function prismaCreatePlan(data: Record<string, unknown>) {
  return db.workoutPlan.create({ data });
}

export async function prismaUpdatePlan(slug: string, data: Record<string, unknown>) {
  return db.workoutPlan.update({ where: { slug }, data });
}

export async function prismaDeletePlan(slug: string) {
  return db.workoutPlan.delete({ where: { slug } });
}

export async function prismaPublishPlan(slug: string) {
  return db.workoutPlan.update({
    where: { slug },
    data: { status: "PUBLISHED", published: true, publishedAt: new Date() },
  });
}

export async function prismaCreateProgram(data: Record<string, unknown>) {
  return db.workoutProgram.create({ data });
}

export async function prismaUpdateProgram(slug: string, data: Record<string, unknown>) {
  return db.workoutProgram.update({ where: { slug }, data });
}

export async function prismaDeleteProgram(slug: string) {
  return db.workoutProgram.delete({ where: { slug } });
}

export async function prismaPublishProgram(slug: string) {
  return db.workoutProgram.update({
    where: { slug },
    data: { status: "PUBLISHED", published: true, publishedAt: new Date() },
  });
}

export async function prismaCreateCategory(data: Record<string, unknown>) {
  return db.workoutCategory.create({ data });
}

export async function prismaMarkComplete(userId: string, data: Record<string, unknown>) {
  return db.workoutHistory.create({ data: { userId, ...data } });
}
