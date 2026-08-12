"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CalculatorResult } from "@/features/calculators/types";

type ResultChartInnerProps = {
  chart: NonNullable<CalculatorResult["chart"]>;
};

const DEFAULT_COLORS = ["#2F6B4F", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export function ResultChartInner({ chart }: ResultChartInnerProps) {
  const data = chart.data.map((d, i) => ({
    ...d,
    fill: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }));

  if (chart.type === "pie") {
    return (
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // bar | gauge | progress → bar chart fallback
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
