import type { CalculatorConfig } from "@/features/calculators/types";
import { GlassCard } from "@/components/home/glass-card";
import { cn } from "@/lib/utils";

type FormulaCardProps = {
  explanation: NonNullable<CalculatorConfig["formulaExplanation"]>;
  className?: string;
};

export function FormulaCard({ explanation, className }: FormulaCardProps) {
  return (
    <GlassCard className={cn("p-6", className)}>
      <h3 className="font-display text-lg font-semibold">
        {explanation.title ?? "How this is calculated"}
      </h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{explanation.body}</p>
      {explanation.latex ? (
        <pre className="bg-muted/60 mt-4 overflow-x-auto rounded-xl p-4 font-mono text-sm">
          {explanation.latex}
        </pre>
      ) : null}
    </GlassCard>
  );
}
