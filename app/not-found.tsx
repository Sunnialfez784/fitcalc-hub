import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Page not found</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href={ROUTES.home}>Back to home</Link>
      </Button>
    </Container>
  );
}
