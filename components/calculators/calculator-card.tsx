"use client";

import Link from "next/link";
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
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

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

type CalculatorCardProps = {
  config: CalculatorConfig;
  className?: string;
};

export function CalculatorCard({ config, className }: CalculatorCardProps) {
  const Icon = ICON_MAP[config.icon] ?? Calculator;

  return (
    <Link
      href={`${ROUTES.calculators}/${config.slug}`}
      className={cn("group block h-full", className)}
    >
      <GlassCard className="hover:border-primary/40 hover:shadow-primary/5 relative h-full overflow-hidden p-5 transition-all duration-300 hover:shadow-lg">
        <div className="bg-primary/10 group-hover:bg-primary/15 mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
          <Icon className="text-primary h-5 w-5" aria-hidden />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-display text-base font-semibold">
            {config.shortTitle ?? config.title}
          </h3>
          {config.featured ? <Badge variant="secondary">Popular</Badge> : null}
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {config.description}
        </p>
      </GlassCard>
    </Link>
  );
}
