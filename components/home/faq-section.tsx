"use client";

import { HOME_FAQS } from "@/lib/constants/homepage";
import { SectionHeader } from "@/components/home/section-header";
import { MotionWrapper } from "@/components/home/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlassCard } from "@/components/home/glass-card";

export function FaqSection() {
  return (
    <Section variant="muted">
      <Container size="md">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about FitCalc Hub."
        />

        <MotionWrapper>
          <GlassCard className="overflow-hidden px-2 md:px-6">
            <Accordion type="single" collapsible className="w-full">
              {HOME_FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
