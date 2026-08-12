"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { actionAddWater, actionAddWeight, actionCreateGoal } from "@/features/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/home/glass-card";
import type { GoalType } from "@/features/dashboard/types";

export function LogWeightForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [weight, setWeight] = useState("");

  return (
    <GlassCard className="p-5">
      <h3 className="font-display mb-3 font-semibold">Log weight</h3>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const v = Number(weight);
          if (!v) return;
          start(async () => {
            await actionAddWeight(v);
            setWeight("");
            router.refresh();
          });
        }}
      >
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="78.2"
          />
        </div>
        <Button type="submit" disabled={pending}>
          Save
        </Button>
      </form>
    </GlassCard>
  );
}

export function LogWaterForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [amount, setAmount] = useState("250");

  return (
    <GlassCard className="p-5">
      <h3 className="font-display mb-3 font-semibold">Log water</h3>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const v = Number(amount);
          if (!v) return;
          start(async () => {
            await actionAddWater(v);
            router.refresh();
          });
        }}
      >
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="water">Amount (ml)</Label>
          <Input
            id="water"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={pending}>
          Add
        </Button>
      </form>
    </GlassCard>
  );
}

const GOAL_TYPES: { value: GoalType; label: string }[] = [
  { value: "GAIN_WEIGHT", label: "Gain Weight" },
  { value: "LOSE_WEIGHT", label: "Lose Weight" },
  { value: "GAIN_MUSCLE", label: "Gain Muscle" },
  { value: "LOSE_FAT", label: "Lose Fat" },
  { value: "MAINTAIN_WEIGHT", label: "Maintain Weight" },
  { value: "CUSTOM", label: "Custom Goal" },
];

export function CreateGoalForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [type, setType] = useState<GoalType>("GAIN_MUSCLE");
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  return (
    <GlassCard className="p-5">
      <h3 className="font-display mb-3 font-semibold">Create goal</h3>
      <form
        className="grid gap-3 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title || !startValue || !targetValue) return;
          start(async () => {
            await actionCreateGoal({
              type,
              title,
              metric: type.includes("FAT") ? "bodyFat" : "weight",
              startValue: Number(startValue),
              targetValue: Number(targetValue),
              unit: type.includes("FAT") ? "%" : "kg",
              targetDate: new Date(Date.now() + 90 * 86400000).toISOString(),
            });
            setTitle("");
            setStartValue("");
            setTargetValue("");
            router.refresh();
          });
        }}
      >
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Goal type</Label>
          <Select value={type} onValueChange={(v) => setType(v as GoalType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GOAL_TYPES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="goal-title">Title</Label>
          <Input
            id="goal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Reach 80 kg"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="start">Start value</Label>
          <Input
            id="start"
            type="number"
            step="0.1"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="target">Target value</Label>
          <Input
            id="target"
            type="number"
            step="0.1"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={pending} className="sm:col-span-2">
          Create goal
        </Button>
      </form>
    </GlassCard>
  );
}
