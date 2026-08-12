"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_CALCULATORS } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverScale } from "@/components/home/motion";
import { cn } from "@/lib/utils";

export function FeaturedCalculatorsCarousel() {
  return (
    <div className="flex [scrollbar-width:none] gap-4 overflow-x-auto pb-4 lg:hidden [&::-webkit-scrollbar]:hidden">
      {FEATURED_CALCULATORS.map((calc) => (
        <HoverScale key={calc.slug} className="w-[85vw] max-w-sm shrink-0 sm:w-80">
          <GlassCard className="relative h-full overflow-hidden">
            <div className={cn("absolute inset-0 bg-gradient-to-br", calc.gradient)} />
            <div className="relative p-6">
              <div className="bg-primary/15 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <calc.icon className="text-primary h-6 w-6" aria-hidden />
              </div>
              <Badge variant="secondary" className="mb-2">
                Calculator
              </Badge>
              <h3 className="font-display text-lg font-semibold">{calc.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {calc.description}
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link href={`${ROUTES.calculators}/${calc.slug}`}>
                  Open Calculator
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </HoverScale>
      ))}
    </div>
  );
}
