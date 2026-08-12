"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { SearchBar } from "@/components/shared/search-bar";

type BlogSearchProps = {
  initialQuery?: string;
  className?: string;
};

export function BlogSearch({ initialQuery = "", className }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const onSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) params.set("q", value.trim());
      else params.delete("q");
      params.delete("page");
      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  return (
    <SearchBar
      placeholder="Search articles, tags, authors…"
      value={query}
      onChange={setQuery}
      onSearch={onSearch}
      className={className}
      disabled={isPending}
    />
  );
}
