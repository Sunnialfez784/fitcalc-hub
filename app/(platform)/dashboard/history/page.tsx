import Link from "next/link";
import {
  getCalculatorHistory,
  getDietLogs,
  getWaterLogs,
  getWeightLogs,
  getWorkoutLogs,
} from "@/features/dashboard/services";
import { formatDashboardDate } from "@/features/dashboard/utils";
import { HistoryTable } from "@/components/dashboard/history-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "History",
  description: "Calculator, workout, diet, and metric history.",
  path: "/dashboard/history",
  noIndex: true,
});

export default async function HistoryPage() {
  const [weights, workouts, water, diets, calcs] = await Promise.all([
    getWeightLogs(),
    getWorkoutLogs(),
    getWaterLogs(),
    getDietLogs(),
    getCalculatorHistory(),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-2">
          All your calculator runs, workouts, diets, and body logs in one place.
        </p>
      </header>

      <Tabs defaultValue="calculators">
        <TabsList className="flex h-auto flex-wrap gap-1">
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="diets">Diets</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="bmi">BMI</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="mt-4">
          <HistoryTable
            columns={[
              { key: "label", header: "Calculator" },
              { key: "summary", header: "Result" },
              { key: "date", header: "Date" },
            ]}
            rows={calcs.map((c) => ({
              label: c.href ? (
                <Link href={c.href} className="hover:text-primary font-medium">
                  {c.label}
                </Link>
              ) : (
                c.label
              ),
              summary: c.summary,
              date: formatDashboardDate(c.createdAt),
            }))}
          />
        </TabsContent>

        <TabsContent value="workouts" className="mt-4">
          <HistoryTable
            columns={[
              { key: "title", header: "Workout" },
              { key: "duration", header: "Duration" },
              { key: "calories", header: "Calories" },
              { key: "date", header: "Completed" },
            ]}
            rows={workouts.map((w) => ({
              title: w.title,
              duration: w.durationMin ? `${w.durationMin} min` : "—",
              calories: w.caloriesBurn ?? "—",
              date: formatDashboardDate(w.completedAt),
            }))}
          />
        </TabsContent>

        <TabsContent value="diets" className="mt-4">
          <HistoryTable
            columns={[
              { key: "title", header: "Meal / Plan" },
              { key: "calories", header: "Calories" },
              { key: "protein", header: "Protein" },
              { key: "date", header: "Logged" },
            ]}
            rows={diets.map((d) => ({
              title: d.title,
              calories: d.calories ?? "—",
              protein: d.proteinG ? `${d.proteinG} g` : "—",
              date: formatDashboardDate(d.recordedAt),
            }))}
          />
        </TabsContent>

        <TabsContent value="weight" className="mt-4">
          <HistoryTable
            columns={[
              { key: "weight", header: "Weight" },
              { key: "note", header: "Note" },
              { key: "date", header: "Date" },
            ]}
            rows={weights.map((w) => ({
              weight: `${w.weightKg} kg`,
              note: w.note ?? "—",
              date: formatDashboardDate(w.recordedAt),
            }))}
          />
        </TabsContent>

        <TabsContent value="bmi" className="mt-4">
          <HistoryTable
            title="BMI derived from weight logs + profile height"
            columns={[
              { key: "weight", header: "Weight" },
              { key: "date", header: "Date" },
            ]}
            rows={weights.map((w) => ({
              weight: `${w.weightKg} kg`,
              date: formatDashboardDate(w.recordedAt),
            }))}
            emptyTitle="No BMI logs"
            emptyDescription="Log weight to build BMI history."
          />
        </TabsContent>

        <TabsContent value="water" className="mt-4">
          <HistoryTable
            columns={[
              { key: "amount", header: "Amount" },
              { key: "date", header: "Date" },
            ]}
            rows={water.map((w) => ({
              amount: `${w.amountMl} ml`,
              date: formatDashboardDate(w.recordedAt),
            }))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
