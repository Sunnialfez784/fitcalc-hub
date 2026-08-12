"use client";

import dynamic from "next/dynamic";
import type { CalculatorResult } from "@/features/calculators/types";
import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "@/components/home/glass-card";
import { cn } from "@/lib/utils";

const ChartInner = dynamic(() => import("./result-chart-inner").then((m) => m.ResultChartInner), {
  ssr: false,
  loading: () => <Skeleton className="h-48 w-full rounded-xl" />,
});

type ResultChartProps = {
  result: CalculatorResult;
  className?: string;
};

/** Lazy-loaded chart wrapper — only mounts Recharts when chart data exists. */
export function ResultChart({ result, className }: ResultChartProps) {
  if (!result.chart?.data?.length) return null;

  return (
    <GlassCard className={cn("p-5", className)}>
      <p className="mb-4 text-sm font-medium">Breakdown</p>
      <ChartInner chart={result.chart} />
    </GlassCard>
  );
}
