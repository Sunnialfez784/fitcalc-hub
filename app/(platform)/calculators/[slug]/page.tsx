import { notFound } from "next/navigation";
import {
  getCalculator,
  listCalculatorSlugs,
  buildCalculatorMetadata,
  calculatorJsonLd,
  calculatorBreadcrumbJsonLd,
  calculatorFaqJsonLd,
  CalculatorPage,
} from "@/features/calculators";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return listCalculatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) {
    return { title: "Calculator not found" };
  }
  return buildCalculatorMetadata(calculator);
}

/**
 * Dynamic calculator route — passes only the slug to the client.
 * Config, formula, and recommendation functions stay in the client registry.
 */
export default async function CalculatorSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    notFound();
  }

  const jsonLd = [
    calculatorJsonLd(calculator),
    calculatorBreadcrumbJsonLd(calculator),
    calculatorFaqJsonLd(calculator),
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorPage slug={slug} />
    </>
  );
}
