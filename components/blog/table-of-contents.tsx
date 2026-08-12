"use client";

import type { TocItem } from "@/features/articles/utils";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold">On this page</p>
      <ul className="space-y-1.5 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground hover:text-foreground hover:border-primary block border-l-2 border-transparent py-0.5 text-sm transition-colors",
                item.level === 3 ? "pl-6" : "pl-3",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
