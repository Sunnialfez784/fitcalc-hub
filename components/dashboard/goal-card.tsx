import { GlassCard } from "@/components/home/glass-card";
import {
  estimateCompletionDate,
  formatDashboardDate,
  goalProgressPct,
} from "@/features/dashboard/utils";
import type { GoalEntry } from "@/features/dashboard/types";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";

export function GoalCard({ goal }: { goal: GoalEntry }) {
  const pct = goalProgressPct(goal);
  const eta = estimateCompletionDate(goal);

  return (
    <GlassCard className="hover:border-primary/30 p-5 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold">{goal.title}</h3>
          {goal.description ? (
            <p className="text-muted-foreground mt-1 text-sm">{goal.description}</p>
          ) : null}
        </div>
        <Badge variant="secondary">{goal.type.replaceAll("_", " ")}</Badge>
      </div>
      <div className="mt-4 flex items-end justify-between text-sm">
        <p>
          <span className="font-semibold">{goal.currentValue}</span>
          <span className="text-muted-foreground">
            {" "}
            / {goal.targetValue}
            {goal.unit ? ` ${goal.unit}` : ""}
          </span>
        </p>
        <p className="text-primary font-semibold">{pct}%</p>
      </div>
      <div className="bg-muted mt-2 h-2 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>
      {eta ? (
        <p className="text-muted-foreground mt-3 text-xs">
          Est. completion {formatDashboardDate(eta)}
        </p>
      ) : null}
    </GlassCard>
  );
}

export function GoalsList({ goals }: { goals: GoalEntry[] }) {
  if (!goals.length) {
    return (
      <EmptyState
        title="No goals yet"
        description="Create a goal to track weight, protein, or custom targets."
      />
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {goals.map((g) => (
        <GoalCard key={g.id} goal={g} />
      ))}
    </div>
  );
}
