import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "FitCalc Hub medical and fitness disclaimer.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <Section>
      <Container size="md">
        <PageHeader
          title="Disclaimer"
          description="FitCalc Hub content is for informational purposes only and is not medical advice."
        />
        <p className="text-muted-foreground text-sm">
          Always consult a qualified healthcare professional before making health decisions. Full
          disclaimer copy will be added here.
        </p>
      </Container>
    </Section>
  );
}
