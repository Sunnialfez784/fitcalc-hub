"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { SearchBar } from "@/components/shared/search-bar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkoutCategory } from "@/features/workouts/types";
import { MUSCLE_GROUPS } from "@/features/workouts/data/taxonomy";

type WorkoutFiltersProps = {
  categories: WorkoutCategory[];
  basePath?: string;
};

export function WorkoutFilters({ categories, basePath = "/workouts" }: WorkoutFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [pending, start] = useTransition();

  const push = useCallback(
    (patch: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (!v || v === "all") params.delete(k);
        else params.set(k, v);
      });
      params.delete("page");
      start(() => router.push(`${basePath}?${params.toString()}`));
    },
    [basePath, router, searchParams],
  );

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search by muscle, goal, equipment…"
        value={query}
        onChange={setQuery}
        onSearch={(v) => push({ q: v })}
        disabled={pending}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-1.5">
          <Label>Difficulty</Label>
          <Select
            value={searchParams.get("difficulty") ?? "all"}
            onValueChange={(v) => push({ difficulty: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Goal</Label>
          <Select
            value={searchParams.get("goal") ?? "all"}
            onValueChange={(v) => push({ goal: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="strength">Strength</SelectItem>
              <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
              <SelectItem value="fat-loss">Fat Loss</SelectItem>
              <SelectItem value="weight-gain">Weight Gain</SelectItem>
              <SelectItem value="general-fitness">General Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Equipment</Label>
          <Select
            value={searchParams.get("equipment") ?? "all"}
            onValueChange={(v) => push({ equipment: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="barbell">Barbell</SelectItem>
              <SelectItem value="dumbbell">Dumbbell</SelectItem>
              <SelectItem value="cable">Cable</SelectItem>
              <SelectItem value="machine">Machine</SelectItem>
              <SelectItem value="bodyweight">Bodyweight</SelectItem>
              <SelectItem value="kettlebell">Kettlebell</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Muscle</Label>
          <Select
            value={searchParams.get("muscle") ?? "all"}
            onValueChange={(v) => push({ muscle: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {MUSCLE_GROUPS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select
            value={searchParams.get("category") ?? "all"}
            onValueChange={(v) => {
              if (v === "all") push({ category: undefined });
              else router.push(`/workouts/category/${v}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
