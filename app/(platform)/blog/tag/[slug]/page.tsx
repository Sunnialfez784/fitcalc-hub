import { notFound } from "next/navigation";
import { getTagBySlug, listArticles, listTags } from "@/features/articles/services";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { ROUTES } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const tags = await listTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return { title: "Tag not found" };
  return buildMetadata({
    title: `#${tag.name} Articles`,
    description: tag.description ?? `Articles tagged ${tag.name}`,
    path: `/blog/tag/${slug}`,
  });
}

export default async function BlogTagPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const paginated = await listArticles({ tagSlug: slug, page, pageSize: 9 });

  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: ROUTES.home },
            { label: "Blog", href: ROUTES.blog },
            { label: `#${tag.name}` },
          ]}
        />
        <header className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold md:text-4xl">#{tag.name}</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {paginated.total} article{paginated.total === 1 ? "" : "s"} tagged with {tag.name}
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <BlogPagination
          page={paginated.page}
          totalPages={paginated.totalPages}
          basePath={`/blog/tag/${slug}`}
        />
      </Container>
    </Section>
  );
}
