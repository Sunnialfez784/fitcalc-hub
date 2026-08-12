import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import type { ArticleWithRelations } from "@/features/articles/types";
import { formatArticleDate, formatCount } from "@/features/articles/utils";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleWithRelations;
  className?: string;
  variant?: "default" | "featured" | "compact";
};

export function ArticleCard({ article, className, variant = "default" }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className={cn("group block h-full", className)}>
      <GlassCard className="hover:border-primary/30 flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <div
          className={cn(
            "relative h-36 bg-gradient-to-br",
            article.coverGradient ?? "from-primary/30 to-emerald-500/10",
            variant === "featured" && "h-44",
            variant === "compact" && "h-24",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white/10,transparent_50%)]" />
          <Badge className="absolute top-3 left-3" variant="secondary">
            {article.category.name}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3
            className={cn(
              "font-display group-hover:text-primary font-semibold transition-colors",
              variant === "featured" ? "text-xl" : "text-base",
            )}
          >
            {article.title}
          </h3>
          {variant !== "compact" ? (
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
              {article.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex items-center justify-between gap-2 border-t pt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {article.author.avatar ?? article.author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{article.author.name}</p>
                <p className="text-muted-foreground text-[11px]">
                  {formatArticleDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden />
                {article.readingTime} min
              </span>
              <span className="hidden items-center gap-1 sm:inline-flex">
                <Eye className="h-3 w-3" aria-hidden />
                {formatCount(article.views)}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
