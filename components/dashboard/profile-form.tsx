"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { actionUpdateProfile } from "@/features/dashboard/actions";
import type {
  ActivityLevel,
  FitnessGoalId,
  UnitSystem,
  UserProfileData,
} from "@/features/dashboard/types";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileFormProps = {
  profile: UserProfileData;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof UserProfileData>(key: K, value: UserProfileData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  return (
    <GlassCard className="p-6">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          start(async () => {
            await actionUpdateProfile(form);
            setSaved(true);
            router.refresh();
          });
        }}
      >
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={form.heightCm}
            onChange={(e) => set("heightCm", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={form.weightKg}
            onChange={(e) => set("weightKg", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dob">Date of birth</Label>
          <Input
            id="dob"
            type="date"
            value={form.dateOfBirth.slice(0, 10)}
            onChange={(e) => set("dateOfBirth", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Activity level</Label>
          <Select
            value={form.activityLevel}
            onValueChange={(v) => set("activityLevel", v as ActivityLevel)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="very_active">Very active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Fitness goal</Label>
          <Select
            value={form.fitnessGoal}
            onValueChange={(v) => set("fitnessGoal", v as FitnessGoalId)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lose_weight">Lose weight</SelectItem>
              <SelectItem value="gain_weight">Gain weight</SelectItem>
              <SelectItem value="gain_muscle">Gain muscle</SelectItem>
              <SelectItem value="lose_fat">Lose fat</SelectItem>
              <SelectItem value="maintain">Maintain</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Units</Label>
          <Select value={form.unitSystem} onValueChange={(v) => set("unitSystem", v as UnitSystem)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="photo">Photo URL</Label>
          <Input
            id="photo"
            value={form.photoUrl ?? ""}
            onChange={(e) => set("photoUrl", e.target.value || undefined)}
            placeholder="https://…"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={form.bio ?? ""}
            onChange={(e) => set("bio", e.target.value)}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save profile"}
          </Button>
          {saved ? <span className="text-success text-sm">Saved</span> : null}
        </div>
      </form>
    </GlassCard>
  );
}
