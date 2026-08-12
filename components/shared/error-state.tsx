"use client";

import { AlertTriangle } from "lucide-react";
import { MotionFade } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <MotionFade>
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center",
          className,
        )}
        role="alert"
      >
        <div className="bg-destructive/10 mb-4 rounded-full p-3">
          <AlertTriangle className="text-destructive h-6 w-6" aria-hidden />
        </div>
        <Heading level="h3" className="text-lg">
          {title}
        </Heading>
        <Text variant="muted" className="mt-1 max-w-sm">
          {description}
        </Text>
        {onRetry ? (
          <Button className="mt-4" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>
    </MotionFade>
  );
}
