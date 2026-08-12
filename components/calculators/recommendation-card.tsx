import { Lightbulb } from "lucide-react";
import type { Recommendation } from "@/features/calculators/types";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RecommendationCardProps = {
  recommendations: Recommendation[];
  title?: string;
  className?: string;
};

export function RecommendationCard({
  recommendations,
  title = "Recommendations",
  className,
}: RecommendationCardProps) {
  if (!recommendations.length) return null;

  return (
    <GlassCard className={cn("p-6", className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
          <Lightbulb className="text-primary h-4 w-4" aria-hidden />
        </div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec) => (
          <li key={rec.id} className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{rec.title}</p>
              {rec.priority ? (
                <Badge
                  variant={
                    rec.priority === "high"
                      ? "destructive"
                      : rec.priority === "medium"
                        ? "warning"
                        : "secondary"
                  }
                  className="shrink-0 capitalize"
                >
                  {rec.priority}
                </Badge>
              ) : null}
            </div>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{rec.description}</p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
