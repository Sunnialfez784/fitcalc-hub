"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CALCULATOR_CATEGORIES } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem, HoverScale } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

export function CalculatorCategoriesSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Calculators"
          title="Every metric that matters"
          description="From BMI to TDEE — precision tools backed by science, designed for clarity."
        />

        <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CALCULATOR_CATEGORIES.map((cat) => (
            <MotionItem key={cat.slug}>
              <HoverScale>
                <Link href={`${ROUTES.calculators}/${cat.slug}`} className="group block h-full">
                  <GlassCard className="hover:border-primary/40 hover:shadow-primary/5 relative h-full overflow-hidden p-5 transition-all duration-300 hover:shadow-lg">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        cat.gradient,
                      )}
                    />
                    <div className="relative">
                      <div className="bg-primary/10 group-hover:bg-primary/15 mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
                        <cat.icon className="text-primary h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="font-display text-base font-semibold">{cat.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                        {cat.description}
                      </p>
                      <ArrowUpRight className="text-primary mt-3 h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
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
