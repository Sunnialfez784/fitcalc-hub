import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { CalculatorCategoriesSection } from "@/components/home/calculator-categories";
import { WhyChooseSection } from "@/components/home/why-choose";
import { FeaturedCalculatorsSection } from "@/components/home/featured-calculators";
import { FeaturedWorkoutsSection } from "@/components/home/featured-workouts";
import { DietPlansSection } from "@/components/home/diet-plans";
import { BlogPreviewSection } from "@/components/home/blog-preview";
import { SkeletonLoader } from "@/components/shared/skeleton";
import { Container } from "@/components/layout/container";
import { buildMetadata } from "@/lib/seo";

const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials").then((m) => m.TestimonialsSection),
  {
    loading: () => (
      <Container className="py-16">
        <SkeletonLoader rows={4} />
      </Container>
    ),
  },
);

const NewsletterSection = dynamic(
  () => import("@/components/home/newsletter").then((m) => m.NewsletterSection),
  {
    loading: () => (
      <Container className="py-8">
        <SkeletonLoader rows={2} />
      </Container>
    ),
  },
);

const FaqSection = dynamic(
  () => import("@/components/home/faq-section").then((m) => m.FaqSection),
  {
    loading: () => (
      <Container className="py-16">
        <SkeletonLoader rows={5} />
      </Container>
    ),
  },
);

export const metadata = buildMetadata({
  title: "Home",
  description:
    "FitCalc Hub — 100+ fitness calculators, workout plans, diet guides, and expert articles. The premium platform for health & performance.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CalculatorCategoriesSection />
      <WhyChooseSection />
      <FeaturedCalculatorsSection />
      <FeaturedWorkoutsSection />
      <DietPlansSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FaqSection />
    </>
  );
}
