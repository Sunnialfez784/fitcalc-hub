import Link from "next/link";
import { Clock, Flame, Dumbbell } from "lucide-react";
import type { WorkoutPlan, WorkoutProgram } from "@/features/workouts/types";
import { formatDifficulty, formatMinutes } from "@/features/workouts/utils";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PlanCardProps = {
  plan: WorkoutPlan;
  className?: string;
};

export function PlanCard({ plan, className }: PlanCardProps) {
  return (
    <Link href={`/workouts/${plan.slug}`} className={cn("group block h-full", className)}>
      <GlassCard className="hover:border-primary/30 flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <div className={cn("relative h-32 bg-gradient-to-br", plan.coverGradient)}>
          <Badge className="absolute top-3 left-3" variant="secondary">
            {formatDifficulty(plan.difficulty)}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display group-hover:text-primary font-semibold transition-colors">
            {plan.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{plan.excerpt}</p>
          <div className="text-muted-foreground mt-auto flex flex-wrap gap-3 border-t pt-4 text-xs">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {formatMinutes(plan.durationMin)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> {plan.caloriesBurned} kcal
            </span>
            <span className="inline-flex items-center gap-1">
              <Dumbbell className="h-3.5 w-3.5" /> {plan.exercises.length} exercises
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

type ProgramCardProps = {
  program: WorkoutProgram;
  className?: string;
};

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <Link
      href={`/workouts/program/${program.slug}`}
      className={cn("group block h-full", className)}
    >
      <GlassCard className="hover:border-primary/30 flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <div className={cn("relative h-36 bg-gradient-to-br", program.coverGradient)}>
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary">{formatDifficulty(program.difficulty)}</Badge>
            {program.featured ? <Badge>Featured</Badge> : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display group-hover:text-primary text-lg font-semibold transition-colors">
            {program.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{program.excerpt}</p>
          <div className="text-muted-foreground mt-auto flex flex-wrap gap-3 border-t pt-4 text-xs">
            <span>{program.durationWeeks} weeks</span>
            <span>{program.daysPerWeek}x / week</span>
            <span>{formatMinutes(program.sessionMinutes)} / session</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
