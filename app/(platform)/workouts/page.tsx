import { Suspense } from "react";
import Link from "next/link";
import {
  getFeaturedPrograms,
  listCategories,
  listPlans,
  listPrograms,
} from "@/features/workouts/services";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PlanCard, ProgramCard, WorkoutFilters } from "@/components/workout";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  WorkoutDifficulty,
  WorkoutGoalId,
  EquipmentId,
  MuscleGroupId,
} from "@/features/workouts/types";

export const metadata = buildMetadata({
  title: "Workouts",
  description:
    "Professional workout programs and plans — PPL, strength, hypertrophy, home training, and more.",
  path: "/workouts",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    difficulty?: string;
    goal?: string;
    equipment?: string;
    muscle?: string;
    category?: string;
  }>;
};

export default async function WorkoutsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const filters = {
    page,
    pageSize: 9,
    query: params.q,
    difficulty: params.difficulty as WorkoutDifficulty | undefined,
    goal: params.goal as WorkoutGoalId | undefined,
    equipment: params.equipment as EquipmentId | undefined,
    muscle: params.muscle as MuscleGroupId | undefined,
    categorySlug: params.category,
  };

  const [categories, featured, programs, plans] = await Promise.all([
    listCategories(),
    getFeaturedPrograms(4),
    listPrograms(filters),
    listPlans(filters),
  ]);

  return (
    <>
      <Section spacing="sm" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.55_0.14_155/0.18),transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
              Workout Planner
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Train with purpose.
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Programs and sessions for every goal — strength, muscle, fat loss, and home training.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl">
            <Suspense fallback={<Skeleton className="h-24 w-full rounded-xl" />}>
              <WorkoutFilters categories={categories} />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container className="space-y-14">
          {!params.q ? (
            <section>
              <h2 className="font-display mb-6 text-2xl font-bold">Featured programs</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((p) => (
                  <ProgramCard key={p.slug} program={p} />
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="font-display mb-6 text-2xl font-bold">Categories</h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((c) => (
                <Link key={c.slug} href={`/workouts/category/${c.slug}`}>
                  <GlassCard className="hover:border-primary/40 h-full p-4 transition-all">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                      {c.description}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display mb-6 text-2xl font-bold">
              {params.q ? `Programs for “${params.q}”` : "All programs"}
            </h2>
            {programs.items.length === 0 ? (
              <GlassCard className="text-muted-foreground p-10 text-center text-sm">
                No programs match those filters.
              </GlassCard>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programs.items.map((p) => (
                  <ProgramCard key={p.slug} program={p} />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-display mb-6 text-2xl font-bold">Single workouts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.items.map((p) => (
                <PlanCard key={p.slug} plan={p} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display mb-4 text-xl font-bold">Browse by muscle</h2>
            <div className="flex flex-wrap gap-2">
              {["chest", "back", "shoulders", "legs", "glutes", "abs", "full-body"].map((m) => (
                <Link key={m} href={`/workouts?muscle=${m}`}>
                  <Badge variant="outline" className="hover:bg-accent cursor-pointer capitalize">
                    {m.replace("-", " ")}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        </Container>
      </Section>
    </>
  );
}
