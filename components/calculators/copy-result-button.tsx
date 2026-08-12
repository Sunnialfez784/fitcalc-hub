"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalculatorResult } from "@/features/calculators/types";
import { cn } from "@/lib/utils";

type CopyResultButtonProps = {
  title: string;
  result: CalculatorResult | null;
  className?: string;
};

export function CopyResultButton({ title, result, className }: CopyResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const lines = [
      `${title}`,
      `${result.label ?? "Result"}: ${result.value}${result.unit ? ` ${result.unit}` : ""}`,
      result.statusLabel ? `Status: ${result.statusLabel}` : "",
      result.interpretation ?? "",
      ...(result.metrics?.map((m) => `${m.label}: ${m.value}${m.unit ? ` ${m.unit}` : ""}`) ?? []),
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [title, result]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      disabled={!result}
      className={cn(className)}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy result"}
    </Button>
  );
}
