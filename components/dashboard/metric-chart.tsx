"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { MetricPoint } from "@/features/dashboard/types";

const MetricChartInner = dynamic(
  () => import("./metric-chart-inner").then((m) => m.MetricChartInner),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full rounded-xl" />,
  },
);

type MetricChartProps = {
  data: MetricPoint[];
  color?: string;
  unit?: string;
  type?: "area" | "bar";
  height?: number;
  className?: string;
};

export function MetricChart(props: MetricChartProps) {
  return <MetricChartInner {...props} />;
}
