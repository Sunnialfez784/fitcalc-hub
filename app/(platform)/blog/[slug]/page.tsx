import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import {
  getAdjacentArticles,
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
  incrementViews,
} from "@/features/articles/services";
import {
  articleBreadcrumbJsonLd,
  articleFaqJsonLd,
  articleJsonLd,
  buildArticleMetadata,
} from "@/features/articles/seo";
import { extractTableOfContents, formatArticleDate } from "@/features/articles/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/home/glass-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArticleCard } from "@/components/blog/article-card";
import { AuthorCard } from "@/components/blog/author-card";
import { ArticleActions } from "@/components/blog/article-actions";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { ReadingProgressBar } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { NewsletterSection } from "@/components/home/newsletter";
import { ROUTES } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  await incrementViews(slug);

  const [related, adjacent] = await Promise.all([
    getRelatedArticles(slug, 3),
    getAdjacentArticles(slug),
  ]);

  const toc = extractTableOfContents(article.content);
  const jsonLd = [
    articleJsonLd(article),
    articleBreadcrumbJsonLd(article),
    articleFaqJsonLd(article),
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />

      <Section spacing="sm">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Blog", href: ROUTES.blog },
              {
                label: article.category.name,
                href: `/blog/category/${article.category.slug}`,
              },
              { label: article.title },
            ]}
          />

          {/* Hero */}
          <header className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">{article.category.name}</Badge>
              {article.tags.map((tag) => (
                <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                  <Badge variant="outline">{tag.name}</Badge>
                </Link>
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl md:leading-tight">
              {article.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{article.excerpt}</p>
            <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span>{article.author.name}</span>
              <span aria-hidden>·</span>
              <span>{formatArticleDate(article.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {article.readingTime} min read
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <ArticleActions
                slug={article.slug}
                title={article.title}
                initialLikes={article.likes}
              />
            </div>
          </header>

          {/* Cover */}
          <div
            className={`mx-auto mt-10 h-48 max-w-4xl rounded-3xl bg-gradient-to-br md:h-72 ${article.coverGradient ?? "from-primary/30 to-emerald-500/10"}`}
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[1fr_220px]">
            <article>
              <MarkdownContent content={article.content} />

              {/* FAQ */}
              {article.faqs?.length ? (
                <div className="mt-12">
                  <h2 className="font-display mb-4 text-2xl font-bold">FAQ</h2>
                  <GlassCard className="px-2 md:px-4">
                    <Accordion type="single" collapsible>
                      {article.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </GlassCard>
                </div>
              ) : null}

              <div className="mt-10">
                <AuthorCard author={article.author} />
              </div>

              {/* Prev / Next */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {adjacent.prev ? (
                  <Link
                    href={`/blog/${adjacent.prev.slug}`}
                    className="hover:border-primary/40 rounded-xl border p-4 transition-colors"
                  >
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </p>
                    <p className="mt-1 font-medium">{adjacent.prev.title}</p>
                  </Link>
                ) : (
                  <div />
                )}
                {adjacent.next ? (
                  <Link
                    href={`/blog/${adjacent.next.slug}`}
                    className="hover:border-primary/40 rounded-xl border p-4 text-right transition-colors"
                  >
                    <p className="text-muted-foreground flex items-center justify-end gap-1 text-xs">
                      Next <ArrowRight className="h-3 w-3" />
                    </p>
                    <p className="mt-1 font-medium">{adjacent.next.title}</p>
                  </Link>
                ) : null}
              </div>

              {/* Comments placeholder */}
              <GlassCard className="text-muted-foreground mt-10 p-6 text-center text-sm">
                Comments are coming soon. Share your thoughts on social for now.
              </GlassCard>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 ? (
            <div className="mt-16">
              <h2 className="font-display mb-6 text-2xl font-bold">Related articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      <NewsletterSection />
    </>
  );
}
