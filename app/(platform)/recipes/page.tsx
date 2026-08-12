import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recipes",
  description: "Healthy recipes and meal ideas.",
  path: "/recipes",
});

export default function RecipesPage() {
  return (
    <Section>
      <Container>
        <PageHeader title="Recipes" description="Recipe library placeholder." />
        <EmptyState
          title="No recipes yet"
          description="Recipes feature will be implemented later."
        />
      </Container>
    </Section>
  );
}
