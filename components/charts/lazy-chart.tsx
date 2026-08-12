"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/shared/skeleton";

/**
 * Dynamic import / lazy-loading pattern for heavy chart libraries.
 * Use this pattern when wiring Recharts views.
 */
export const LazyChartPlaceholder = dynamic(
  () => import("@/components/charts/chart-placeholder").then((mod) => mod.ChartPlaceholder),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  },
);
