import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/home/glass-card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: LucideIcon;
  progress?: number;
  className?: string;
  accent?: string;
};

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  progress,
  className,
  accent,
}: StatCardProps) {
  return (
    <GlassCard
      className={cn("group hover:border-primary/30 p-5 transition-all hover:shadow-md", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {title}
          </p>
          <p className="font-display mt-2 text-2xl font-bold tracking-tight">
            {value}
            {unit ? (
              <span className="text-muted-foreground ml-1 text-sm font-medium">{unit}</span>
            ) : null}
          </p>
          {subtitle ? <p className="text-muted-foreground mt-1 text-xs">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div
            className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
            style={accent ? { backgroundColor: `${accent}22`, color: accent } : undefined}
          >
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      {typeof progress === "number" ? (
        <div className="bg-muted mt-4 h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: accent,
            }}
          />
        </div>
      ) : null}
    </GlassCard>
  );
}
