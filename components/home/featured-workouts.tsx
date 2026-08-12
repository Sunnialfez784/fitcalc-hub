"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORKOUTS } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem, HoverScale } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FeaturedWorkoutsSection() {
  return (
    <Section variant="muted">
      <Container>
        <SectionHeader
          eyebrow="Workouts"
          title="Plans for every goal & environment"
          description="From gym powerlifting to home HIIT — structured programs that deliver results."
        />

        <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_WORKOUTS.map((plan) => (
            <MotionItem key={plan.title}>
              <HoverScale>
                <Link href={plan.href ?? ROUTES.workouts} className="group block h-full">
                  <GlassCard className="hover:border-primary/30 relative h-full overflow-hidden transition-all hover:shadow-lg">
                    <div
                      className={cn("absolute inset-0 bg-gradient-to-br opacity-60", plan.gradient)}
                    />
                    <div className="relative flex h-full flex-col p-6">
                      <Badge className="mb-4 w-fit" variant="secondary">
                        {plan.tag}
                      </Badge>
                      <div className="bg-background/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
                        <plan.icon className="h-6 w-6 text-white" aria-hidden />
                      </div>
                      <h3 className="font-display text-lg font-semibold">{plan.title}</h3>
                      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                      <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                        View plan <ArrowRight className="h-3.5 w-3.5" />
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
