import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPlanBySlug,
  getAllPlanSlugs,
  getRelatedPlans,
  resolveExercises,
  isBookmarked,
} from "@/features/workouts/services";
import {
  buildPlanMetadata,
  workoutBreadcrumbJsonLd,
  workoutFaqJsonLd,
  workoutPlanJsonLd,
} from "@/features/workouts/seo";
import { formatDifficulty, formatMinutes } from "@/features/workouts/utils";
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
import { ExerciseList, PlanCard, WorkoutActions } from "@/components/workout";
import { ROUTES } from "@/lib/constants";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPlanSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) return { title: "Workout not found" };
  return buildPlanMetadata(plan);
}

export default async function WorkoutPlanPage({ params }: PageProps) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) notFound();

  const [exercises, related, bookmarked] = await Promise.all([
    resolveExercises(plan.exercises),
    getRelatedPlans(slug, 3),
    isBookmarked(`plan:${slug}`),
  ]);

  const jsonLd = [
    workoutPlanJsonLd(plan),
    workoutBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Workouts", path: "/workouts" },
      { name: plan.title, path: `/workouts/${plan.slug}` },
    ]),
    workoutFaqJsonLd(plan.faqs),
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section spacing="sm">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Workouts", href: ROUTES.workouts },
              { label: plan.title },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <header className="mb-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge>{formatDifficulty(plan.difficulty)}</Badge>
                  {plan.goals.map((g) => (
                    <Badge key={g} variant="secondary">
                      {g.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  {plan.title}
                </h1>
                <p className="text-muted-foreground mt-4 text-lg">{plan.excerpt}</p>
                <div className="mt-6">
                  <WorkoutActions
                    bookmarkKey={`plan:${slug}`}
                    title={plan.title}
                    href={`/workouts/${slug}`}
                    initialBookmarked={bookmarked}
                  />
                </div>
              </header>

              <div
                className={`mb-10 h-44 rounded-3xl bg-gradient-to-br md:h-56 ${plan.coverGradient}`}
              />

              <section className="mb-10">
                <h2 className="font-display mb-3 text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
              </section>

              <section className="mb-10">
                <h2 className="font-display mb-4 text-2xl font-bold">Exercise list</h2>
                <ExerciseList items={exercises} />
              </section>

              {plan.faqs.length ? (
                <section className="mb-10">
                  <h2 className="font-display mb-4 text-2xl font-bold">FAQ</h2>
                  <GlassCard className="px-2 md:px-4">
                    <Accordion type="single" collapsible>
                      {plan.faqs.map((f, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger>{f.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {f.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </GlassCard>
                </section>
              ) : null}

              {related.length ? (
                <section>
                  <h2 className="font-display mb-4 text-2xl font-bold">Related workouts</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((p) => (
                      <PlanCard key={p.slug} plan={p} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <GlassCard className="space-y-4 p-5">
                <h2 className="font-display font-semibold">Session details</h2>
                <Stat label="Duration" value={formatMinutes(plan.durationMin)} />
                <Stat label="Calories" value={`~${plan.caloriesBurned} kcal`} />
                <Stat label="Exercises" value={String(plan.exercises.length)} />
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Equipment</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {plan.equipment.map((e) => (
                      <Badge key={e} variant="outline" className="capitalize">
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Target muscles</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {plan.targetMuscles.map((m) => (
                      <Badge key={m} variant="secondary" className="capitalize">
                        {m.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                {plan.programId ? (
                  <p className="text-muted-foreground text-xs">
                    Part of a program —{" "}
                    <Link href="/workouts/program/push-pull-legs" className="text-primary">
                      browse programs
                    </Link>
                  </p>
                ) : null}
                <div>
                  <p className="mb-2 text-sm font-medium">Progress</p>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-[35%] rounded-full" />
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">Mark complete to track</p>
                </div>
              </GlassCard>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
