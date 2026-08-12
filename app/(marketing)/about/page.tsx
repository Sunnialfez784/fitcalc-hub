import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "About FitCalc Hub — the fitness, nutrition, and health platform.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <Container size="md">
        <PageHeader
          title="About FitCalc Hub"
          description="Building the largest fitness, nutrition, workout, and health platform."
        />
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p>
            FitCalc Hub is an enterprise SaaS platform for calculators, workouts, diet plans,
            recipes, progress tracking, and health education. This page is a content placeholder.
          </p>
        </div>
      </Container>
    </Section>
  );
}
