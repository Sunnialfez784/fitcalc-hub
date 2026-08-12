import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "FitCalc Hub terms of service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section>
      <Container size="md">
        <PageHeader
          title="Terms of Service"
          description="Legal placeholder — replace with counsel-approved copy."
        />
        <p className="text-muted-foreground text-sm">
          Terms of service content will be added here.
        </p>
      </Container>
    </Section>
  );
}
