"use client";

import { motion } from "framer-motion";
import type { CalculatorResult } from "@/features/calculators/types";
import { statusToBadgeVariant } from "@/features/calculators/utils";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ResultCardProps = {
  result: CalculatorResult;
  className?: string;
};

export function ResultCard({ result, className }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <GlassCard className={cn("overflow-hidden p-6", className)} glow>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              {result.label ?? "Your result"}
            </p>
            <p className="font-display mt-1 text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
              {result.value}
              {result.unit ? (
                <span className="text-muted-foreground ml-1.5 text-xl font-medium">
                  {result.unit}
                </span>
              ) : null}
            </p>
          </div>
          {result.statusLabel || result.status ? (
            <Badge variant={statusToBadgeVariant(result.status)}>
              {result.statusLabel ?? result.status}
            </Badge>
          ) : null}
        </div>

        {result.progress !== undefined ? (
          <div className="mt-5">
            <div className="bg-muted h-2 overflow-hidden rounded-full">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, result.progress))}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="text-muted-foreground mt-1.5 text-xs">{result.progress}% of range</p>
          </div>
        ) : null}

        {result.metrics?.length ? (
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            {result.metrics.map((m) => (
              <div key={m.label} className="bg-muted/40 rounded-xl p-3">
                <dt className="text-muted-foreground text-xs">{m.label}</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums">
                  {m.value}
                  {m.unit ? (
                    <span className="text-muted-foreground ml-1 text-sm">{m.unit}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {result.interpretation ? (
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {result.interpretation}
          </p>
        ) : null}
      </GlassCard>
    </motion.div>
  );
}
