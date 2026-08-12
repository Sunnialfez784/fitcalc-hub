import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getLatestArticles } from "@/features/articles/services";
import { ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/home/section-header";
import { GlassCard } from "@/components/home/glass-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BlogPreviewGrid } from "@/components/home/blog-preview-grid";
import { cn } from "@/lib/utils";

export async function BlogPreviewSection() {
  const articles = await getLatestArticles(3);

  const cards = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category.name,
    author: article.author.name,
    readTime: `${article.readingTime} min read`,
    gradient: article.coverGradient ?? "from-emerald-500/15 to-teal-500/5",
  }));

  return (
    <Section variant="muted">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Blog"
            title="Latest from our experts"
            description="Evidence-based articles on training, nutrition, and health science."
            align="left"
            className="mb-0"
          />
          <Button variant="outline" asChild className="shrink-0">
            <Link href={ROUTES.blog}>
              All articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {cards.map((article) => (
            <GlassCard
              key={article.slug}
              className="group hover:border-primary/30 overflow-hidden transition-all hover:shadow-lg"
            >
              <div
                className={cn(
                  "h-2 bg-gradient-to-r",
                  article.gradient.replace("/15", "/40").replace("/5", "/20"),
                )}
              />
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                <Link href={`${ROUTES.blog}/${article.slug}`}>
                  <h3 className="font-display group-hover:text-primary text-lg font-semibold transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {article.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <BlogPreviewGrid articles={cards} />
      </Container>
    </Section>
  );
}
