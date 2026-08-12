import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string | undefined>;
  className?: string;
};

export function BlogPagination({
  page,
  totalPages,
  basePath = "/blog",
  searchParams = {},
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("mt-10 flex items-center justify-center gap-2", className)}
    >
      {page > 1 ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={hrefFor(page - 1)}>Previous</Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
      )}
      <span className="text-muted-foreground px-3 text-sm">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={hrefFor(page + 1)}>Next</Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      )}
    </nav>
  );
}
