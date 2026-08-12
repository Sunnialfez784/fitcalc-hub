"use client";

import {
  Calculator,
  Scale,
  Flame,
  Heart,
  Droplets,
  Activity,
  Target,
  Gauge,
  TrendingUp,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import type { CalculatorConfig } from "@/features/calculators/types";
import { getCategoryById } from "@/features/calculators/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  Scale,
  Flame,
  Heart,
  Droplets,
  Activity,
  Target,
  Gauge,
  TrendingUp,
  Dumbbell,
};

type CalculatorHeroProps = {
  config: CalculatorConfig;
  className?: string;
};

export function CalculatorHero({ config, className }: CalculatorHeroProps) {
  const Icon = ICON_MAP[config.icon] ?? Calculator;
  const category = getCategoryById(config.category);

  return (
    <div
      className={cn(
        "border-primary/15 from-primary/10 via-card/80 relative mb-8 overflow-hidden rounded-3xl border bg-gradient-to-br to-emerald-500/5 p-6 md:p-10",
        className,
      )}
    >
      <div className="bg-primary/10 pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="bg-primary/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
          <Icon className="text-primary h-7 w-7" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {category ? <Badge variant="secondary">{category.name}</Badge> : null}
            {config.featured ? <Badge variant="outline">Popular</Badge> : null}
            <Badge variant="success">Free</Badge>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {config.title}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
            {config.description}
          </p>
        </div>
      </div>
    </div>
  );
}
