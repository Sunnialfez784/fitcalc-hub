import type { ResultRange } from "@/features/calculators/types";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { statusToBadgeVariant } from "@/features/calculators/utils";
import { cn } from "@/lib/utils";

type HealthyRangeCardProps = {
  ranges: ResultRange[];
  activeRangeId?: string;
  title?: string;
  className?: string;
};

export function HealthyRangeCard({
  ranges,
  activeRangeId,
  title = "Healthy ranges",
  className,
}: HealthyRangeCardProps) {
  if (!ranges.length) return null;

  return (
    <GlassCard className={cn("p-6", className)}>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {ranges.map((range) => {
          const isActive = activeRangeId === range.id;
          const band =
            range.min !== undefined && range.max !== undefined
              ? `${range.min} – ${range.max}`
              : range.min !== undefined
                ? `≥ ${range.min}`
                : range.max !== undefined
                  ? `< ${range.max}`
                  : "—";

          return (
            <li
              key={range.id}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors",
                isActive ? "border-primary/40 bg-primary/5" : "bg-muted/30 border-transparent",
              )}
            >
              <div className="flex items-center gap-2">
                <Badge variant={statusToBadgeVariant(range.status)} className="capitalize">
                  {range.label}
                </Badge>
                {range.description ? (
                  <span className="text-muted-foreground hidden sm:inline">
                    {range.description}
                  </span>
                ) : null}
              </div>
              <span className="font-medium tabular-nums">{band}</span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
