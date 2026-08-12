"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { DIET_PLANS } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem, HoverScale } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export function DietPlansSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Nutrition"
          title="Diet plans that fit your life"
          description="Structured meal frameworks for every goal — high protein, keto, vegetarian, and more."
        />

        <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIET_PLANS.map((plan) => (
            <MotionItem key={plan.title}>
              <HoverScale>
                <Link href={ROUTES.dietPlans} className="group block h-full">
                  <GlassCard className="hover:border-primary/30 relative h-full overflow-hidden p-6 transition-all hover:shadow-md">
                    <div
                      className={cn("absolute inset-0 bg-gradient-to-br opacity-50", plan.gradient)}
                    />
                    <div className="relative">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl">
                          <plan.icon className="text-primary h-5 w-5" aria-hidden />
                        </div>
                        <span className="bg-background/80 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                          <Flame className="h-3 w-3 text-orange-500" aria-hidden />
                          {plan.calories}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold">{plan.title}</h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                      <span className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                        Explore plan <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </HoverScale>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
