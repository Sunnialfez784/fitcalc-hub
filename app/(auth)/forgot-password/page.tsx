import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Forgot password",
  description: "Reset your FitCalc Hub password.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <Section>
      <Container size="sm">
        <PageHeader title="Forgot password" description="Password reset placeholder." />
        <Card>
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>Email reset flow will be implemented with Auth.js.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              Send reset link (coming soon)
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
