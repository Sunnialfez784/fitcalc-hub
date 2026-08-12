"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center p-6">
        <ErrorState
          title="Critical application error"
          description={error.message || "Please reload the application."}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
