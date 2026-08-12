import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log in",
  description: "Sign in to FitCalc Hub.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Section>
      <Container size="sm">
        <PageHeader
          title="Log in"
          description="Authentication UI placeholder — logic not implemented."
        />
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Google OAuth and email auth are prepared in Auth.js config.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" disabled>
              Continue with Google (coming soon)
            </Button>
            <Button className="w-full" variant="outline" disabled>
              Continue with Email (coming soon)
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              No account?{" "}
              <Link
                href={ROUTES.register}
                className="text-primary underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
