import { getSavedItems } from "@/features/dashboard/services";
import { SavedContentClient } from "@/components/dashboard/saved-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Saved",
  description: "Your saved articles, calculators, workouts, diets, and recipes.",
  path: "/dashboard/saved",
  noIndex: true,
});

export default async function SavedPage() {
  const items = await getSavedItems();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Saved</h1>
        <p className="text-muted-foreground mt-2">Content you bookmarked across FitCalc Hub.</p>
      </header>
      <SavedContentClient items={items} />
    </div>
  );
}
