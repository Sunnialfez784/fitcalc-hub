"use client";

import { WHY_CHOOSE_FEATURES } from "@/lib/constants/homepage";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem, HoverScale } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function WhyChooseSection() {
  return (
    <Section variant="muted">
      <Container>
        <SectionHeader
          eyebrow="Why FitCalc Hub"
          title="Built for performance, designed for people"
          description="Everything you need to train smarter, eat better, and track progress — in one premium platform."
        />

        <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_FEATURES.map((feature) => (
            <MotionItem key={feature.title}>
              <HoverScale>
                <GlassCard className="group hover:border-primary/30 h-full p-6 transition-all hover:shadow-md">
                  <div className="bg-primary/10 group-hover:bg-primary/15 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                    <feature.icon className="text-primary h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </HoverScale>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
