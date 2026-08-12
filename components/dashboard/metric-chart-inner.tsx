"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MetricPoint } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

type MetricChartProps = {
  data: MetricPoint[];
  color?: string;
  unit?: string;
  type?: "area" | "bar";
  className?: string;
  height?: number;
};

export function MetricChartInner({
  data,
  color = "oklch(0.55 0.14 155)",
  unit = "",
  type = "area",
  className,
  height = 260,
}: MetricChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} width={40} />
            <Tooltip
              formatter={(value) => [`${value}${unit ? ` ${unit}` : ""}`, ""]}
              contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }}
            />
            <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${color.replace(/\W/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} width={40} domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value) => [`${value}${unit ? ` ${unit}` : ""}`, ""]}
              contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#grad-${color.replace(/\W/g, "")})`}
              strokeWidth={2}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
