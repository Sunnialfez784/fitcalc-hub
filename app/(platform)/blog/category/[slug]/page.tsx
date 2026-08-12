import { notFound } from "next/navigation";
import { getCategoryBySlug, listArticles, listCategories } from "@/features/articles/services";
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
  const categories = await listCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return buildMetadata({
    title: `${category.name} Articles`,
    description: category.description ?? `Articles in ${category.name}`,
    path: `/blog/category/${slug}`,
  });
}

export default async function BlogCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const paginated = await listArticles({ categorySlug: slug, page, pageSize: 9 });

  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: ROUTES.home },
            { label: "Blog", href: ROUTES.blog },
            { label: category.name },
          ]}
        />
        <header className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold md:text-4xl">{category.name}</h1>
          {category.description ? (
            <p className="text-muted-foreground mt-3 text-lg">{category.description}</p>
          ) : null}
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <BlogPagination
          page={paginated.page}
          totalPages={paginated.totalPages}
          basePath={`/blog/category/${slug}`}
        />
      </Container>
    </Section>
  );
}
