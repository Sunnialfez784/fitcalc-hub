import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import {
  getFeaturedArticles,
  getTrendingArticles,
  getPopularTags,
  listCategories,
  listArticles,
} from "@/features/articles/services";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/home/newsletter";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Expert fitness, nutrition, and training articles — protein, BMI, creatine, workouts, and diet plans.",
  path: "/blog",
});

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string; author?: string }>;
};

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const query = params.q;
  const authorSlug = params.author;

  const [featured, trending, categories, popularTags, paginated] = await Promise.all([
    getFeaturedArticles(3),
    getTrendingArticles(4),
    listCategories(),
    getPopularTags(10),
    listArticles({ page, pageSize: 9, query, authorSlug }),
  ]);

  const listTitle = query
    ? `Results for “${query}”`
    : authorSlug
      ? "Author articles"
      : "Latest articles";

  return (
    <>
      {/* Hero */}
      <Section spacing="sm" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.55_0.14_155/0.2),transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
              FitCalc Hub Blog
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Train smarter. Eat better.{" "}
              <span className="from-primary bg-gradient-to-r to-teal-500 bg-clip-text text-transparent">
                Learn deeper.
              </span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Evidence-based guides on nutrition, training, and supplements — written for athletes
              and beginners alike.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
                <BlogSearch initialQuery={query} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container className="space-y-14">
          {/* Featured */}
          {!query && !authorSlug && featured.length > 0 ? (
            <section>
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="font-display flex items-center gap-2 text-2xl font-bold">
                  <Sparkles className="text-primary h-5 w-5" aria-hidden />
                  Featured
                </h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {featured.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="featured" />
                ))}
              </div>
            </section>
          ) : null}

          {/* Categories */}
          {!query ? (
            <section>
              <h2 className="font-display mb-6 text-2xl font-bold">Categories</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/blog/category/${cat.slug}`}>
                    <GlassCard className="hover:border-primary/40 h-full p-5 transition-all hover:shadow-md">
                      <h3 className="font-display font-semibold">{cat.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">{cat.description}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Latest / Results */}
            <div className="lg:col-span-2">
              <h2 className="font-display mb-6 text-2xl font-bold">{listTitle}</h2>
              {paginated.items.length === 0 ? (
                <GlassCard className="text-muted-foreground p-10 text-center text-sm">
                  No articles found. Try a different search.
                </GlassCard>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {paginated.items.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
              <BlogPagination
                page={paginated.page}
                totalPages={paginated.totalPages}
                searchParams={{ q: query, author: authorSlug }}
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div>
                <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="text-primary h-4 w-4" aria-hidden />
                  Trending
                </h2>
                <div className="space-y-3">
                  {trending.map((article, i) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="hover:bg-muted/50 flex gap-3 rounded-xl border p-3 transition-colors"
                    >
                      <span className="text-primary font-display text-xl font-bold opacity-40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm leading-snug font-medium">{article.title}</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {article.readingTime} min · {article.category.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display mb-4 text-lg font-semibold">Popular tags</h2>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                      <Badge variant="outline" className="hover:bg-accent cursor-pointer">
                        {tag.name}
                        <span className="text-muted-foreground ml-1">{tag.count}</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <GlassCard className="from-primary/10 bg-gradient-to-br to-transparent p-5">
                <p className="font-display font-semibold">Explore calculators</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Pair every article with precision tools.
                </p>
                <Button asChild size="sm" className="mt-4">
                  <Link href="/calculators">
                    Open calculators
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </GlassCard>
            </aside>
          </div>
        </Container>
      </Section>

      <NewsletterSection />
    </>
  );
}
