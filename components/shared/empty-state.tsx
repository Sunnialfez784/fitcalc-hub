"use client";

import { Inbox } from "lucide-react";
import { MotionFade } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <MotionFade>
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center",
          className,
        )}
        role="status"
      >
        <div className="bg-muted mb-4 rounded-full p-3">
          {icon ?? <Inbox className="text-muted-foreground h-6 w-6" aria-hidden />}
        </div>
        <Heading level="h3" className="text-lg">
          {title}
        </Heading>
        {description ? (
          <Text variant="muted" className="mt-1 max-w-sm">
            {description}
          </Text>
        ) : null}
        {actionLabel && onAction ? (
          <Button className="mt-4" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </MotionFade>
  );
}
