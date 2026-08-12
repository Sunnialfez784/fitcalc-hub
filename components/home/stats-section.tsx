"use client";

import { HOME_STATS } from "@/lib/constants/homepage";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem, HoverScale } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function StatsSection() {
  return (
    <Section spacing="sm" className="relative -mt-8">
      <Container>
        <MotionStagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {HOME_STATS.map((stat) => (
            <MotionItem key={stat.label}>
              <HoverScale>
                <GlassCard className="group hover:border-primary/30 hover:bg-card/80 p-6 text-center transition-colors">
                  <div className="bg-primary/10 group-hover:bg-primary/15 mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
                    <stat.icon className="text-primary h-5 w-5" aria-hidden />
                  </div>
                  <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm font-medium">{stat.label}</p>
                </GlassCard>
              </HoverScale>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
