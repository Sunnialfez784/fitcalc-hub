"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import type { CalculatorCategoryId, CalculatorConfig } from "@/features/calculators/types";
import { CALCULATOR_CATEGORIES } from "@/features/calculators/data";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { SearchBar } from "@/components/shared/search-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

type CalculatorsCatalogProps = {
  calculators: CalculatorConfig[];
  initialCategory?: string;
};

export function CalculatorsCatalog({ calculators, initialCategory }: CalculatorsCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">(initialCategory ?? "all");

  const filtered = useMemo(() => {
    let list = calculators;
    if (category !== "all") {
      list = list.filter((c) => c.category === (category as CalculatorCategoryId));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.slug.includes(q) ||
          c.shortTitle?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [calculators, category, query]);

  const popular = useMemo(() => calculators.filter((c) => c.featured).slice(0, 6), [calculators]);

  const newest = useMemo(() => [...calculators].slice(0, 5), [calculators]);

  const usedCategories = useMemo(() => {
    const ids = new Set(calculators.map((c) => c.category));
    return CALCULATOR_CATEGORIES.filter((c) => ids.has(c.id));
  }, [calculators]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search calculators…"
          value={query}
          onChange={setQuery}
          className="max-w-md flex-1"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategory("all")}>
            <Badge variant={category === "all" ? "default" : "outline"} className="cursor-pointer">
              All
            </Badge>
          </button>
          {usedCategories.map((cat) => (
            <button key={cat.id} type="button" onClick={() => setCategory(cat.id)}>
              <Badge
                variant={category === cat.id ? "default" : "outline"}
                className="cursor-pointer"
              >
                {cat.name}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {popular.length > 0 && category === "all" && !query ? (
        <section>
          <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="text-primary h-5 w-5" aria-hidden />
            Popular calculators
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popular.map((config) => (
              <CalculatorCard key={`pop-${config.slug}`} config={config} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="font-display mb-4 text-xl font-semibold">
          {query || category !== "all" ? "Results" : "All calculators"}
          <span className="text-muted-foreground ml-2 text-sm font-normal">
            ({filtered.length})
          </span>
        </h2>
        {filtered.length === 0 ? (
          <EmptyState
            title="No calculators found"
            description="Try a different search or category."
            actionLabel="Clear filters"
            onAction={() => {
              setQuery("");
              setCategory("all");
            }}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((config) => (
              <CalculatorCard key={config.slug} config={config} />
            ))}
          </div>
        )}
      </section>

      {newest.length > 0 && category === "all" && !query ? (
        <section>
          <h2 className="font-display mb-4 text-xl font-semibold">Newest calculators</h2>
          <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5")}>
            {newest.map((config) => (
              <CalculatorCard key={`new-${config.slug}`} config={config} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
