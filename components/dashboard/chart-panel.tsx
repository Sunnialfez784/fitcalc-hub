import { GlassCard } from "@/components/home/glass-card";
import { MetricChart } from "./metric-chart";
import type { MetricPoint } from "@/features/dashboard/types";

type ChartPanelProps = {
  title: string;
  description?: string;
  data: MetricPoint[];
  color?: string;
  unit?: string;
  type?: "area" | "bar";
};

export function ChartPanel({ title, description, data, color, unit, type }: ChartPanelProps) {
  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="font-display font-semibold">{title}</h3>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      <MetricChart data={data} color={color} unit={unit} type={type} />
    </GlassCard>
  );
}
