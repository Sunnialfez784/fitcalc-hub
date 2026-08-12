"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <Section spacing="lg">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-primary/20 from-primary/10 via-card/80 relative overflow-hidden rounded-3xl border bg-gradient-to-br to-emerald-500/5 p-8 md:p-14"
        >
          <div className="bg-primary/10 pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Mail className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Get weekly fitness insights
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
              Join 10,000+ subscribers. Calculator tips, workout science, and nutrition guides — no
              spam, ever.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 text-primary mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                You&apos;re subscribed! Check your inbox.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="bg-background/80 h-12 flex-1 backdrop-blur-sm"
                />
                <Button type="submit" size="lg" className="h-12 shrink-0 px-8">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
