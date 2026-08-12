/** Estimate reading time from markdown/plain text (avg 200 wpm). */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_\-\|`\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/** Slugify a title for URLs. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Extract h2/h3 headings from markdown for table of contents. */
export function extractTableOfContents(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = slugify(text);
    items.push({ id, text, level });
  }

  return items;
}

/** Format ISO date for display. */
export function formatArticleDate(iso: string, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/** Format compact view counts. */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
