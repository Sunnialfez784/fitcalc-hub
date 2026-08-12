"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { HERO_FLOATING_ICONS } from "@/lib/constants/homepage";
import { ROUTES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.55_0.14_155/0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_20%,oklch(0.65_0.12_250/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_60%,oklch(0.7_0.15_85/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_85%)]" />
      </div>

      {/* Animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating icons */}
      {HERO_FLOATING_ICONS.map(({ icon: Icon, className }, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute hidden lg:flex ${className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-card/40 border-border/50 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-md"
          >
            <Icon className="text-primary h-6 w-6" aria-hidden />
          </motion.div>
        </motion.div>
      ))}

      <Container className="relative flex min-h-[92vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-primary/20 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          The #1 Fitness Calculator Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.08]"
        >
          Your body.{" "}
          <span className="from-primary bg-gradient-to-r via-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Your data.
          </span>{" "}
          Your edge.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
        >
          100+ precision calculators, expert workout plans, and nutrition guides — built for
          athletes, trainers, and anyone serious about health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 w-full max-w-xl"
        >
          <SearchBar
            placeholder="Search calculators, workouts, diets..."
            className="shadow-lg"
            onSearch={(q) => {
              if (q) window.location.href = `${ROUTES.calculators}?q=${encodeURIComponent(q)}`;
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="shadow-primary/20 h-12 px-8 text-base shadow-lg">
            <Link href={ROUTES.calculators}>
              Explore Calculators
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base backdrop-blur-sm"
          >
            <Link href={ROUTES.register}>Get Started Free</Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground mt-6 text-sm"
        >
          No credit card required · 100+ free tools · Trusted by 10K+ users
        </motion.p>
      </Container>
    </section>
  );
}
