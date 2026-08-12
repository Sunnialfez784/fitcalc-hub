import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact FitCalc Hub.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <Container size="md">
        <PageHeader title="Contact" description="Get in touch — form coming soon." />
        <EmptyState
          title="Contact form placeholder"
          description="Wire React Hook Form + contactSchema next."
        />
      </Container>
    </Section>
  );
}
