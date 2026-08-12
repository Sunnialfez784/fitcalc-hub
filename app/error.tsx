"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/shared/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <ErrorState
        title="Something went wrong"
        description={error.message || "An unexpected error occurred."}
        onRetry={reset}
      />
    </Container>
  );
}
