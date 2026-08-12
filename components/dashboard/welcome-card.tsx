import Link from "next/link";
import { Flame } from "lucide-react";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/constants";
import type { UserProfileData } from "@/features/dashboard/types";

type WelcomeCardProps = {
  profile: UserProfileData;
  streakDays: number;
};

export function WelcomeCard({ profile, streakDays }: WelcomeCardProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <GlassCard glow className="relative overflow-hidden p-6 md:p-8">
      <div className="from-primary/15 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-emerald-500/10" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/15 text-primary text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-muted-foreground text-sm">{greeting}</p>
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {profile.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {profile.fitnessGoal.replaceAll("_", " ")} · {profile.activityLevel} activity
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-background/50 flex items-center gap-2 rounded-xl border px-4 py-2 backdrop-blur">
            <Flame className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-xs font-medium">{streakDays}-day streak</p>
              <p className="text-muted-foreground text-[11px]">Keep it going</p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={ROUTES.dashboardProgress}>Log progress</Link>
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
