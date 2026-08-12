"use client";

import type { CalculatorConfig } from "@/features/calculators/types";
import { getRelatedCalculators } from "@/features/calculators/configs";
import { CalculatorCard } from "./calculator-card";
import { cn } from "@/lib/utils";

type RelatedCalculatorsProps = {
  config: CalculatorConfig;
  className?: string;
};

export function RelatedCalculators({ config, className }: RelatedCalculatorsProps) {
  const related = getRelatedCalculators(config.slug);
  if (!related.length) return null;

  return (
    <div className={cn(className)}>
      <h3 className="font-display mb-4 text-lg font-semibold">Related calculators</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((c) => (
          <CalculatorCard key={c.slug} config={c} />
        ))}
      </div>
    </div>
  );
}
