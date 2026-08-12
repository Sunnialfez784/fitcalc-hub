"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants/homepage";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const current = TESTIMONIALS[index];

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by athletes & trainers"
          description="Join thousands who've transformed how they track, train, and fuel."
        />

        <div className="relative mx-auto max-w-3xl">
          <GlassCard className="border-border/40 from-card/80 via-card/60 to-primary/5 relative overflow-hidden bg-gradient-to-br p-8 md:p-12">
            <Quote className="text-primary/20 absolute top-6 left-6 h-12 w-12" aria-hidden />

            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="text-center"
                >
                  <blockquote className="text-lg leading-relaxed font-medium md:text-xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <Avatar className="border-primary/20 h-11 w-11 border-2">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {current.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold">{current.name}</p>
                      <p className="text-muted-foreground text-sm">{current.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "bg-primary w-6" : "bg-muted-foreground/30 w-2"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
