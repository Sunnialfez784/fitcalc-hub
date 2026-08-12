"use client";

import { useMemo } from "react";
import { listCalculators } from "../configs";
import type { CalculatorCategoryId, CalculatorConfig } from "../types";

/** Filter / search calculators for index pages. */
export function useCalculatorCatalog(options?: {
  category?: CalculatorCategoryId;
  query?: string;
  featured?: boolean;
}) {
  return useMemo(() => {
    let list = listCalculators({
      category: options?.category,
      featured: options?.featured,
    });

    if (options?.query?.trim()) {
      const q = options.query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.slug.includes(q),
      );
    }

    return list as CalculatorConfig[];
  }, [options?.category, options?.query, options?.featured]);
}
