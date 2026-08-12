import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  listCategories,
  listPlans,
  listPrograms,
} from "@/features/workouts/services";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PlanCard, ProgramCard } from "@/components/workout";
import { ROUTES } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const cats = await listCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return buildMetadata({
    title: `${category.name} Workouts`,
    description: category.description,
    path: `/workouts/category/${slug}`,
  });
}

export default async function WorkoutCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const [programs, plans] = await Promise.all([
    listPrograms({ categorySlug: slug, page, pageSize: 12 }),
    listPlans({ categorySlug: slug, pageSize: 12 }),
  ]);

  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: ROUTES.home },
            { label: "Workouts", href: ROUTES.workouts },
            { label: category.name },
          ]}
        />
        <header className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="text-muted-foreground mt-3 text-lg">{category.description}</p>
        </header>

        {programs.items.length ? (
          <div className="mb-12">
            <h2 className="font-display mb-4 text-xl font-bold">Programs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.items.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        ) : null}

        {plans.items.length ? (
          <div>
            <h2 className="font-display mb-4 text-xl font-bold">Workouts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.items.map((p) => (
                <PlanCard key={p.slug} plan={p} />
              ))}
            </div>
          </div>
        ) : null}

        {!programs.items.length && !plans.items.length ? (
          <p className="text-muted-foreground text-sm">No workouts in this category yet.</p>
        ) : null}
      </Container>
    </Section>
  );
}
