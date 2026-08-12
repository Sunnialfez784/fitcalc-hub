import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "FitCalc Hub privacy policy.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Container size="md">
        <PageHeader
          title="Privacy Policy"
          description="Legal placeholder — replace with counsel-approved copy."
        />
        <p className="text-muted-foreground text-sm">Privacy policy content will be added here.</p>
      </Container>
    </Section>
  );
}
