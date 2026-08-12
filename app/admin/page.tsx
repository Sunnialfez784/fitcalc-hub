import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin",
  description: "FitCalc Hub admin area.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <Section>
      <Container>
        <PageHeader title="Admin" description="Admin dashboard is intentionally not built yet." />
        <EmptyState
          title="Admin scaffold only"
          description="Do not implement the admin dashboard in this phase."
        />
      </Container>
    </Section>
  );
}
