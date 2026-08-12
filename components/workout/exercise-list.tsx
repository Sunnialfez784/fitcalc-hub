import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import type { WorkoutExerciseItem } from "@/features/workouts/types";
import type { Exercise } from "@/features/workouts/types";
import { cn } from "@/lib/utils";

type Resolved = WorkoutExerciseItem & { exercise: Exercise };

export function ExerciseList({ items }: { items: Resolved[] }) {
  if (!items.length) {
    return (
      <GlassCard className="text-muted-foreground p-6 text-center text-sm">
        Rest day — no exercises scheduled.
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <GlassCard key={`${item.exerciseId}-${i}`} className="overflow-hidden">
          <div className={cn("h-1.5 bg-gradient-to-r", item.exercise.imageGradient)} />
          <div className="p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-muted-foreground text-xs font-medium">Exercise {i + 1}</p>
                <h3 className="font-display text-lg font-semibold">{item.exercise.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{item.exercise.description}</p>
              </div>
              <Badge variant="secondary">{item.exercise.primaryMuscle}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Meta label="Sets" value={String(item.sets)} />
              <Meta label="Reps" value={item.reps} />
              <Meta label="Rest" value={`${item.restSec}s`} />
              <Meta label="Tempo" value={item.tempo ?? item.exercise.tempo ?? "—"} />
            </div>
            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger className="py-2 text-sm">Instructions & tips</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2 text-sm">
                  <ol className="list-decimal space-y-1 pl-4">
                    {item.exercise.instructions.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="text-foreground font-medium">Common mistakes</p>
                  <ul className="list-disc pl-4">
                    {item.exercise.commonMistakes.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/40 rounded-xl px-3 py-2 text-center">
      <p className="text-muted-foreground text-[10px] tracking-wide uppercase">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export function ProgramTimeline({
  days,
}: {
  days: Array<{
    dayNumber: number;
    title: string;
    focus?: string;
    isRestDay: boolean;
    planSlug?: string;
  }>;
}) {
  return (
    <ol className="border-border/80 relative space-y-4 border-l pl-6">
      {days.map((d) => (
        <li key={d.dayNumber} className="relative">
          <span className="bg-primary text-primary-foreground absolute top-1 -left-[1.65rem] flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
            {d.dayNumber}
          </span>
          <GlassCard className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{d.title}</p>
                {d.focus ? <p className="text-muted-foreground text-xs">{d.focus}</p> : null}
              </div>
              {d.isRestDay ? (
                <Badge variant="outline">Rest</Badge>
              ) : d.planSlug ? (
                <a href={`/workouts/${d.planSlug}`} className="text-primary text-xs font-medium">
                  Open workout →
                </a>
              ) : null}
            </div>
          </GlassCard>
        </li>
      ))}
    </ol>
  );
}
