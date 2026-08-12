import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Diet Plans",
  description: "Nutrition and diet plan library.",
  path: "/diet-plans",
});

export default function DietPlansPage() {
  return (
    <Section>
      <Container>
        <PageHeader title="Diet Plans" description="Nutrition plans placeholder." />
        <EmptyState title="No diet plans yet" description="Diet plan feature will ship later." />
      </Container>
    </Section>
  );
}
