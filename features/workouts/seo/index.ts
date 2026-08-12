import type { Metadata } from "next";
import { buildMetadata, canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { FaqItem, WorkoutPlan, WorkoutProgram } from "../types";

export function buildPlanMetadata(plan: WorkoutPlan): Metadata {
  const path = `/workouts/${plan.slug}`;
  const base = buildMetadata({
    title: plan.seoTitle ?? plan.title,
    description: plan.seoDescription ?? plan.excerpt,
    path,
  });
  return {
    ...base,
    alternates: { canonical: plan.canonicalUrl ?? canonicalUrl(path) },
  };
}

export function buildProgramMetadata(program: WorkoutProgram): Metadata {
  const path = `/workouts/program/${program.slug}`;
  const base = buildMetadata({
    title: program.seoTitle ?? program.title,
    description: program.seoDescription ?? program.excerpt,
    path,
  });
  return {
    ...base,
    alternates: { canonical: program.canonicalUrl ?? canonicalUrl(path) },
  };
}

export function workoutPlanJsonLd(plan: WorkoutPlan) {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: plan.title,
    description: plan.excerpt,
    url: canonicalUrl(`/workouts/${plan.slug}`),
    activityDuration: `PT${plan.durationMin}M`,
    intensity: plan.difficulty,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function workoutProgramJsonLd(program: WorkoutProgram) {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: program.title,
    description: program.excerpt,
    url: canonicalUrl(`/workouts/program/${program.slug}`),
    activityDuration: `PT${program.sessionMinutes}M`,
    intensity: program.difficulty,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function workoutBreadcrumbJsonLd(items: Array<{ name: string; path?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path ? canonicalUrl(item.path) : undefined,
    })),
  };
}

export function workoutFaqJsonLd(faqs?: FaqItem[]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
