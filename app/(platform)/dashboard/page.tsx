import Link from "next/link";
import { Beef, Droplets, Flame, Scale, Activity, Target } from "lucide-react";
import {
  getDashboardSnapshot,
  getLatestArticlesForDashboard,
  getMetricSeries,
  getRecommendedDiets,
  getRecommendedWorkouts,
} from "@/features/dashboard/services";
import { pctOf } from "@/features/dashboard/utils";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ChartPanel } from "@/components/dashboard/chart-panel";
import { GoalsList } from "@/components/dashboard/goal-card";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default async function DashboardHomePage() {
  const [snapshot, weeklyWeight, articles] = await Promise.all([
    getDashboardSnapshot(),
    getMetricSeries("weight", "week"),
    getLatestArticlesForDashboard(3),
  ]);

  const { profile, summary, streakDays, weeklyProgressPct, monthlyProgressPct } = snapshot;
  const workouts = getRecommendedWorkouts();
  const diets = getRecommendedDiets();

  return (
    <div className="space-y-8">
      <WelcomeCard profile={profile} streakDays={streakDays} />

      {/* Daily summary */}
      <section>
        <h2 className="font-display mb-4 text-xl font-bold">Daily summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Weight"
            value={summary.weightKg}
            unit="kg"
            icon={Scale}
            subtitle="Latest weigh-in"
          />
          <StatCard
            title="BMI"
            value={summary.bmi}
            icon={Activity}
            subtitle="From height & weight"
            accent="oklch(0.55 0.12 250)"
          />
          <StatCard
            title="Calories"
            value={summary.calories}
            unit="kcal"
            icon={Flame}
            progress={pctOf(summary.calories, summary.caloriesGoal)}
            subtitle={`Goal ${summary.caloriesGoal}`}
            accent="oklch(0.65 0.15 55)"
          />
          <StatCard
            title="Protein"
            value={summary.proteinG}
            unit="g"
            icon={Beef}
            progress={pctOf(summary.proteinG, summary.proteinGoal)}
            subtitle={`Goal ${summary.proteinGoal} g`}
            accent="oklch(0.55 0.16 25)"
          />
          <StatCard
            title="Water"
            value={summary.waterMl}
            unit="ml"
            icon={Droplets}
            progress={pctOf(summary.waterMl, summary.waterGoal)}
            subtitle={`Goal ${summary.waterGoal} ml`}
            accent="oklch(0.6 0.12 220)"
          />
          <StatCard
            title="Workout streak"
            value={streakDays}
            unit="days"
            icon={Flame}
            subtitle="Consistency wins"
          />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Weekly progress"
          value={`${weeklyProgressPct}%`}
          subtitle="Vs last week's targets"
          progress={weeklyProgressPct}
        />
        <StatCard
          title="Monthly progress"
          value={`${monthlyProgressPct}%`}
          subtitle="Goal adherence this month"
          progress={monthlyProgressPct}
        />
        <StatCard
          title="Today's goal"
          value={`${snapshot.todayGoalPct}%`}
          icon={Target}
          subtitle={snapshot.todayGoalLabel}
          progress={snapshot.todayGoalPct}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChartPanel
            title="Weekly weight"
            description="Last 7 days"
            data={weeklyWeight}
            unit="kg"
          />
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Active goals</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href={ROUTES.dashboardProgress}>Manage</Link>
              </Button>
            </div>
            <GoalsList goals={snapshot.goals.slice(0, 2)} />
          </div>
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed items={snapshot.recentActivity} />
        </div>
      </div>

      {/* Latest articles */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Latest articles</h2>
          <Button asChild variant="outline" size="sm">
            <Link href={ROUTES.blog}>View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`}>
              <GlassCard className="hover:border-primary/30 h-full p-5 transition-all hover:shadow-md">
                <Badge variant="secondary">{a.category.name}</Badge>
                <h3 className="font-display mt-3 leading-snug font-semibold">{a.title}</h3>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{a.excerpt}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="font-display mb-4 text-xl font-bold">Recommended workouts</h2>
          <div className="space-y-3">
            {workouts.map((w) => (
              <Link key={w.title} href={w.href}>
                <GlassCard className="hover:border-primary/30 overflow-hidden transition-all">
                  <div className={cn("h-1.5 bg-gradient-to-r", w.gradient)} />
                  <div className="p-4">
                    <p className="font-medium">{w.title}</p>
                    <p className="text-muted-foreground text-xs">{w.meta}</p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display mb-4 text-xl font-bold">Recommended diet plans</h2>
          <div className="space-y-3">
            {diets.map((d) => (
              <Link key={d.title} href={d.href}>
                <GlassCard className="hover:border-primary/30 overflow-hidden transition-all">
                  <div className={cn("h-1.5 bg-gradient-to-r", d.gradient)} />
                  <div className="p-4">
                    <p className="font-medium">{d.title}</p>
                    <p className="text-muted-foreground text-xs">{d.meta}</p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
