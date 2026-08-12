"use client";

import type { CalculatorConfig, FormulaFn } from "@/features/calculators/types";
import { getCategoryById } from "@/features/calculators/data";
import { useCalculatorEngine } from "@/features/calculators/hooks";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/home/glass-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalculatorHero } from "./calculator-hero";
import { CalculatorForm } from "./calculator-form";
import { ResultCard } from "./result-card";
import { ResultChart } from "./result-chart";
import { FormulaCard } from "./formula-card";
import { HealthyRangeCard } from "./healthy-range-card";
import { RecommendationCard } from "./recommendation-card";
import { RelatedCalculators } from "./related-calculators";
import { ShareButtons } from "./share-buttons";
import { DownloadPDFButton } from "./download-pdf-button";
import { CopyResultButton } from "./copy-result-button";
import { ROUTES } from "@/lib/constants";

type CalculatorLayoutProps = {
  config: CalculatorConfig;
  formula: FormulaFn;
};

/**
 * Reusable calculator page layout.
 * Driven entirely by CalculatorConfig + FormulaFn — no per-calculator page code needed.
 */
export function CalculatorLayout({ config, formula }: CalculatorLayoutProps) {
  const engine = useCalculatorEngine({ config, formula });
  const category = getCategoryById(config.category);

  const crumbs = [
    { label: "Home", href: ROUTES.home },
    { label: "Calculators", href: ROUTES.calculators },
    ...(category
      ? [{ label: category.name, href: `${ROUTES.calculators}?category=${category.slug}` }]
      : []),
    { label: config.shortTitle ?? config.title },
  ];

  return (
    <Section spacing="sm">
      <Container>
        <Breadcrumbs items={crumbs} />
        <CalculatorHero config={config} />

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <ShareButtons title={config.title} />
          <CopyResultButton title={config.title} result={engine.result} />
          <DownloadPDFButton title={config.title} result={engine.result} />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <GlassCard className="p-6 lg:col-span-2" glow>
            <h2 className="font-display mb-4 text-lg font-semibold">Enter your details</h2>
            <CalculatorForm
              fields={engine.fields}
              form={engine.form}
              onSubmit={engine.onSubmit}
              onReset={engine.reset}
              isPending={engine.isPending}
            />
          </GlassCard>

          <div className="space-y-6 lg:col-span-3">
            {engine.result ? (
              <>
                <ResultCard result={engine.result} />
                <ResultChart result={engine.result} />
              </>
            ) : (
              <GlassCard className="text-muted-foreground flex min-h-[220px] items-center justify-center p-8 text-center text-sm">
                Results will appear here after you calculate — with status badges, ranges, and
                charts.
              </GlassCard>
            )}

            {config.ranges?.length ? (
              <HealthyRangeCard ranges={config.ranges} activeRangeId={engine.result?.range?.id} />
            ) : null}

            <RecommendationCard recommendations={engine.recommendations} />
          </div>
        </div>

        {config.formulaExplanation ? (
          <div className="mt-10">
            <FormulaCard explanation={config.formulaExplanation} />
          </div>
        ) : null}

        {config.faqs?.length ? (
          <div className="mt-10">
            <h2 className="font-display mb-4 text-xl font-semibold">Frequently asked questions</h2>
            <GlassCard className="px-2 md:px-4">
              <Accordion type="single" collapsible>
                {config.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </div>
        ) : null}

        <div className="mt-12">
          <RelatedCalculators config={config} />
        </div>
      </Container>
    </Section>
  );
}
