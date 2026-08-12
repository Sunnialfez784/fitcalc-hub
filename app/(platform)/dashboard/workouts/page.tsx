import Link from "next/link";
import { Dumbbell, Flame, Target } from "lucide-react";
import { getUserWorkoutDashboard } from "@/features/workouts/services";
import { StatCard } from "@/components/dashboard/stat-card";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/workout";
import { buildMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/constants";
import { formatRelative } from "@/features/dashboard/utils";

export const metadata = buildMetadata({
  title: "My Workouts",
  description: "Today's workout, streak, favorites, and history.",
  path: "/dashboard/workouts",
  noIndex: true,
});

export default async function DashboardWorkoutsPage() {
  const data = await getUserWorkoutDashboard();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">My Workouts</h1>
        <p className="text-muted-foreground mt-2">
          Track sessions, streaks, and favorite exercises.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Completed"
          value={data.completedCount}
          icon={Dumbbell}
          subtitle="All-time sessions"
        />
        <StatCard
          title="Streak"
          value={data.streakDays}
          unit="days"
          icon={Flame}
          subtitle="Keep showing up"
        />
        <StatCard
          title="Weekly progress"
          value={`${data.weeklyProgressPct}%`}
          progress={data.weeklyProgressPct}
        />
        <StatCard
          title="Monthly progress"
          value={`${data.monthlyProgressPct}%`}
          progress={data.monthlyProgressPct}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-display mb-3 text-lg font-semibold">Today&apos;s workout</h2>
          {data.todaysWorkout ? (
            <div>
              <p className="text-2xl font-bold">{data.todaysWorkout.title}</p>
              {data.todaysWorkout.focus ? (
                <p className="text-muted-foreground mt-1 text-sm">{data.todaysWorkout.focus}</p>
              ) : null}
              <Button asChild className="mt-4">
                <Link href={data.todaysWorkout.href}>Start workout</Link>
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Rest day — recover well.</p>
          )}
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent history</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href={ROUTES.dashboardHistory}>All history</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {data.recentHistory.map((h) => (
              <li key={h.id} className="flex items-center justify-between gap-3 text-sm">
                {h.href ? (
                  <Link href={h.href} className="hover:text-primary font-medium">
                    {h.title}
                  </Link>
                ) : (
                  <span className="font-medium">{h.title}</span>
                )}
                <span className="text-muted-foreground text-xs">
                  {formatRelative(h.completedAt)}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <section>
        <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-bold">
          <Target className="text-primary h-5 w-5" />
          Favorite exercises
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.favoriteExercises.map((e) => (
            <Badge key={e.id} variant="secondary" className="px-3 py-1.5 text-sm">
              {e.name}
            </Badge>
          ))}
        </div>
      </section>

      {data.recommended ? (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Recommended program</h2>
            <Button asChild variant="outline" size="sm">
              <Link href={ROUTES.workouts}>Browse all</Link>
            </Button>
          </div>
          <div className="max-w-md">
            <ProgramCard program={data.recommended} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
