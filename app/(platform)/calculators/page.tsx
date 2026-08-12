import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CalculatorsCatalog } from "@/components/calculators/calculators-catalog";
import { listCalculators } from "@/features/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calculators",
  description:
    "Free fitness calculators — BMI, BMR, TDEE, protein, and water intake. Precision tools for body composition, nutrition, and hydration.",
  path: "/calculators",
});

type PageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function CalculatorsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const calculators = listCalculators();

  return (
    <Section>
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-primary mb-2 text-sm font-semibold tracking-widest uppercase">Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Fitness calculators
          </h1>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
            Precision tools for body composition, metabolism, nutrition, and hydration — free, fast,
            and science-backed.
          </p>
        </div>

        <CalculatorsCatalog calculators={calculators} initialCategory={params.category} />
      </Container>
    </Section>
  );
}
