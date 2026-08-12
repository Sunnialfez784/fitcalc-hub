import { listAllMetrics } from "@/features/dashboard/metrics";
import { getGoals, getMetricSeries } from "@/features/dashboard/services";
import { ChartPanel } from "@/components/dashboard/chart-panel";
import { GoalsList } from "@/components/dashboard/goal-card";
import { CreateGoalForm, LogWaterForm, LogWeightForm } from "@/components/dashboard/log-forms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Progress",
  description: "Track weight, BMI, nutrition, and training progress.",
  path: "/dashboard/progress",
  noIndex: true,
});

export default async function ProgressPage() {
  const metrics = listAllMetrics();
  const goals = await getGoals();

  const chartEntries = await Promise.all(
    metrics.map(async (m) => ({
      metric: m,
      data: await getMetricSeries(m.id, m.id === "workouts" ? "month" : "month"),
    })),
  );

  const yearly = await getMetricSeries("weight", "year");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground mt-2">
          Log metrics, review charts, and manage fitness goals.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <LogWeightForm />
        <LogWaterForm />
        <CreateGoalForm />
      </div>

      <section>
        <h2 className="font-display mb-4 text-xl font-bold">Goals</h2>
        <GoalsList goals={goals} />
      </section>

      <section>
        <h2 className="font-display mb-4 text-xl font-bold">Charts</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {chartEntries.map(({ metric, data }) => (
            <ChartPanel
              key={metric.id}
              title={metric.label}
              description={metric.description}
              data={data}
              color={metric.color}
              unit={metric.unit}
              type={metric.id === "workouts" || metric.id === "steps" ? "bar" : "area"}
            />
          ))}
          <ChartPanel
            title="Yearly weight trend"
            description="Long-range progress overview"
            data={yearly}
            unit="kg"
          />
          <ChartPanel
            title="Monthly progress (calories)"
            description="Intake consistency"
            data={await getMetricSeries("calories", "month")}
            color="oklch(0.65 0.15 55)"
            unit="kcal"
            type="bar"
          />
        </div>
      </section>
    </div>
  );
}
