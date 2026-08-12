import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Register",
  description: "Create your FitCalc Hub account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <Section>
      <Container size="sm">
        <PageHeader
          title="Create account"
          description="Registration placeholder — logic not implemented."
        />
        <Card>
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>
              Auth providers are configured; signup flow comes next.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" disabled>
              Sign up with Google (coming soon)
            </Button>
            <Button className="w-full" variant="outline" disabled>
              Sign up with Email (coming soon)
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link href={ROUTES.login} className="text-primary underline-offset-4 hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
