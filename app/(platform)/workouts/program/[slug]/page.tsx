import { notFound } from "next/navigation";
import {
  getAllProgramSlugs,
  getProgramBySlug,
  getRelatedPrograms,
  isBookmarked,
  resolveExercises,
} from "@/features/workouts/services";
import {
  buildProgramMetadata,
  workoutBreadcrumbJsonLd,
  workoutFaqJsonLd,
  workoutProgramJsonLd,
} from "@/features/workouts/seo";
import { formatDifficulty, formatMinutes } from "@/features/workouts/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/home/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExerciseList, ProgramCard, ProgramTimeline, WorkoutActions } from "@/components/workout";
import { ROUTES } from "@/lib/constants";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program not found" };
  return buildProgramMetadata(program);
}

export default async function WorkoutProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const [related, bookmarked] = await Promise.all([
    getRelatedPrograms(slug, 3),
    isBookmarked(`program:${slug}`),
  ]);

  const trainingDays = program.days.filter((d) => !d.isRestDay);
  const daysWithExercises = await Promise.all(
    trainingDays.map(async (d) => ({
      ...d,
      resolved: await resolveExercises(d.exercises),
    })),
  );
  const firstDayExercises = daysWithExercises[0]?.resolved ?? [];

  const jsonLd = [
    workoutProgramJsonLd(program),
    workoutBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Workouts", path: "/workouts" },
      { name: program.title, path: `/workouts/program/${program.slug}` },
    ]),
    workoutFaqJsonLd(program.faqs),
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
              { label: program.title },
            ]}
          />

          <header className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              <Badge>{formatDifficulty(program.difficulty)}</Badge>
              <Badge variant="secondary">{program.durationWeeks} weeks</Badge>
              <Badge variant="outline">{program.daysPerWeek} days / week</Badge>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              {program.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">{program.excerpt}</p>
            <div className="mt-6 flex justify-center">
              <WorkoutActions
                bookmarkKey={`program:${slug}`}
                title={program.title}
                href={`/workouts/program/${slug}`}
                initialBookmarked={bookmarked}
              />
            </div>
          </header>

          <div
            className={`mx-auto mb-12 h-48 max-w-4xl rounded-3xl bg-gradient-to-br md:h-64 ${program.coverGradient}`}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              <section>
                <h2 className="font-display mb-3 text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </section>

              <section>
                <h2 className="font-display mb-4 text-2xl font-bold">Weekly schedule</h2>
                <ProgramTimeline days={program.days} />
              </section>

              <section>
                <h2 className="font-display mb-4 text-2xl font-bold">Day workouts</h2>
                <Tabs defaultValue={String(daysWithExercises[0]?.dayNumber ?? 1)}>
                  <TabsList className="mb-4 flex h-auto flex-wrap">
                    {daysWithExercises.map((d) => (
                      <TabsTrigger key={d.dayNumber} value={String(d.dayNumber)}>
                        Day {d.dayNumber}: {d.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {daysWithExercises.map((d) => (
                    <TabsContent key={d.dayNumber} value={String(d.dayNumber)}>
                      <ExerciseList items={d.resolved} />
                    </TabsContent>
                  ))}
                </Tabs>
              </section>

              {program.faqs.length ? (
                <section>
                  <h2 className="font-display mb-4 text-2xl font-bold">FAQ</h2>
                  <GlassCard className="px-2 md:px-4">
                    <Accordion type="single" collapsible>
                      {program.faqs.map((f, i) => (
                        <AccordionItem key={i} value={`f-${i}`}>
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
                  <h2 className="font-display mb-4 text-2xl font-bold">Related programs</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((p) => (
                      <ProgramCard key={p.slug} program={p} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <GlassCard className="space-y-4 p-5">
                <h2 className="font-display font-semibold">Program details</h2>
                <Row label="Duration" value={`${program.durationWeeks} weeks`} />
                <Row label="Frequency" value={`${program.daysPerWeek}x / week`} />
                <Row label="Session" value={formatMinutes(program.sessionMinutes)} />
                <Row label="Calories" value={`~${program.caloriesPerSession} kcal`} />
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Equipment</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {program.equipment.map((e) => (
                      <Badge key={e} variant="outline" className="capitalize">
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Target muscles</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {program.targetMuscles.map((m) => (
                      <Badge key={m} variant="secondary" className="capitalize">
                        {m.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                {firstDayExercises.length ? (
                  <p className="text-muted-foreground text-xs">
                    Day 1 includes {firstDayExercises.length} exercises
                  </p>
                ) : null}
              </GlassCard>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
