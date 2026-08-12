"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { actionUnsave } from "@/features/dashboard/actions";
import type { SavedItemEntry, SavedItemType } from "@/features/dashboard/types";
import { GlassCard } from "@/components/home/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TYPES: { value: SavedItemType | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "ARTICLE", label: "Articles" },
  { value: "CALCULATOR", label: "Calculators" },
  { value: "WORKOUT", label: "Workouts" },
  { value: "DIET", label: "Diets" },
  { value: "RECIPE", label: "Recipes" },
];

function SavedList({ items }: { items: SavedItemEntry[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  if (!items.length) {
    return (
      <EmptyState
        title="Nothing saved"
        description="Bookmark articles, calculators, workouts, diets, and recipes to find them here."
        icon={<Bookmark className="text-muted-foreground h-6 w-6" />}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <GlassCard key={item.id} className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <Badge variant="secondary" className="mb-2">
              {item.type}
            </Badge>
            <Link
              href={item.href}
              className="hover:text-primary block font-medium transition-colors"
            >
              {item.title}
            </Link>
            {item.subtitle ? (
              <p className="text-muted-foreground mt-1 text-xs">{item.subtitle}</p>
            ) : null}
          </div>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={pending}
            aria-label="Remove saved item"
            onClick={() =>
              start(async () => {
                await actionUnsave(item.id);
                router.refresh();
              })
            }
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </GlassCard>
      ))}
    </div>
  );
}

export function SavedContentClient({ items }: { items: SavedItemEntry[] }) {
  return (
    <Tabs defaultValue="ALL">
      <TabsList className="flex h-auto flex-wrap">
        {TYPES.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TYPES.map((t) => (
        <TabsContent key={t.value} value={t.value} className="mt-4">
          <SavedList items={t.value === "ALL" ? items : items.filter((i) => i.type === t.value)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
