import type { Metadata } from "next";
import { buildMetadata, canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { CalculatorConfig } from "../types";
import { getCategoryById } from "../data";

/** Generate Next.js Metadata for a calculator page from config. */
export function buildCalculatorMetadata(config: CalculatorConfig): Metadata {
  const path = `/calculators/${config.slug}`;
  return {
    ...buildMetadata({
      title: config.seo.title,
      description: config.seo.description,
      path,
      image: config.seo.image,
    }),
    keywords: config.seo.keywords,
  };
}

/** JSON-LD WebApplication / HowTo for calculator pages. */
export function calculatorJsonLd(config: CalculatorConfig) {
  const url = canonicalUrl(`/calculators/${config.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.title,
    description: config.seo.description,
    url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/** BreadcrumbList JSON-LD for calculator pages. */
export function calculatorBreadcrumbJsonLd(config: CalculatorConfig) {
  const category = getCategoryById(config.category);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${siteConfig.url}/calculators`,
      },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `${siteConfig.url}/calculators?category=${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: config.title,
        item: `${siteConfig.url}/calculators/${config.slug}`,
      },
    ],
  };
}

/** FAQPage JSON-LD when config has FAQs. */
export function calculatorFaqJsonLd(config: CalculatorConfig) {
  if (!config.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
