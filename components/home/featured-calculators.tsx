import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_CALCULATORS } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FeaturedCalculatorsCarousel } from "@/components/home/featured-calculators-carousel";
import { cn } from "@/lib/utils";

export function FeaturedCalculatorsSection() {
  return (
    <Section>
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Featured"
            title="Most popular calculators"
            description="Start with the tools millions use to understand their body and fuel their goals."
            align="left"
            className="mb-0"
          />
          <Button variant="outline" asChild className="shrink-0">
            <Link href={ROUTES.calculators}>
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-2">
          {FEATURED_CALCULATORS.map((calc) => (
            <GlassCard
              key={calc.slug}
              className="group hover:border-primary/30 relative overflow-hidden transition-all hover:shadow-lg"
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", calc.gradient)} />
              <div className="relative flex gap-5 p-6">
                <div className="bg-primary/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                  <calc.icon className="text-primary h-7 w-7" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col">
                  <Badge variant="secondary" className="mb-2 w-fit">
                    Calculator
                  </Badge>
                  <h3 className="font-display text-xl font-semibold">{calc.title}</h3>
                  <p className="text-muted-foreground mt-1 flex-1 text-sm leading-relaxed">
                    {calc.description}
                  </p>
                  <Button asChild size="sm" className="mt-4 w-fit">
                    <Link href={`${ROUTES.calculators}/${calc.slug}`}>
                      Open Calculator
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Mobile/tablet carousel */}
        <FeaturedCalculatorsCarousel />
      </Container>
    </Section>
  );
}
