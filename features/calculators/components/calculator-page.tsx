"use client";

import { useMemo } from "react";
import "../bootstrap";
import { getCalculator } from "../configs";
import { CalculatorLayout } from "@/components/calculators";
import { EmptyState } from "@/components/shared/empty-state";

type CalculatorPageProps = {
  /** Only the slug is passed from the Server Component — configs/formulas resolve on the client. */
  slug: string;
};

/**
 * Client entry for a single calculator.
 * Resolves config + formula from the registry so no functions cross the RSC boundary.
 */
export function CalculatorPage({ slug }: CalculatorPageProps) {
  const calculator = useMemo(() => getCalculator(slug), [slug]);

  if (!calculator) {
    return (
      <EmptyState
        title="Calculator not found"
        description="This calculator is not registered in the engine."
      />
    );
  }

  return <CalculatorLayout config={calculator} formula={calculator.formula} />;
}
