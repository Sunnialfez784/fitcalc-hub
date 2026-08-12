"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalculatorResult } from "@/features/calculators/types";
import { cn } from "@/lib/utils";

type DownloadPDFButtonProps = {
  title: string;
  result: CalculatorResult | null;
  className?: string;
};

/**
 * Placeholder PDF export — generates a printable text blob.
 * Replace with a real PDF library (e.g. @react-pdf/renderer) later.
 */
export function DownloadPDFButton({ title, result, className }: DownloadPDFButtonProps) {
  const handleDownload = () => {
    if (!result) return;

    const lines = [
      `FitCalc Hub — ${title}`,
      `Generated: ${new Date().toISOString()}`,
      "",
      `${result.label ?? "Result"}: ${result.value}${result.unit ? ` ${result.unit}` : ""}`,
      result.statusLabel ? `Status: ${result.statusLabel}` : "",
      result.interpretation ? `Notes: ${result.interpretation}` : "",
      "",
      ...(result.metrics?.map((m) => `${m.label}: ${m.value}${m.unit ? ` ${m.unit}` : ""}`) ?? []),
      "",
      "This report is for informational purposes only and is not medical advice.",
    ].filter(Boolean);

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={!result}
      className={cn(className)}
    >
      <Download className="h-4 w-4" />
      Download report
    </Button>
  );
}
