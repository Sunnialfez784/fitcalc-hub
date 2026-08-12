import { GlassCard } from "@/components/home/glass-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Settings",
  description: "Dashboard preferences and reminder placeholders.",
  path: "/dashboard/settings",
  noIndex: true,
});

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Preferences for the dashboard. Reminder delivery wires up with Auth later.
        </p>
      </header>

      <GlassCard className="divide-y p-2">
        {[
          {
            id: "workout",
            title: "Workout reminders",
            description: "Get nudged on scheduled training days.",
            defaultChecked: true,
          },
          {
            id: "water",
            title: "Water reminders",
            description: "Hydration nudges throughout the day.",
            defaultChecked: true,
          },
          {
            id: "goal",
            title: "Goal reminders",
            description: "Weekly check-ins on active goals.",
            defaultChecked: false,
          },
          {
            id: "email",
            title: "Email digests",
            description: "Weekly progress summary by email.",
            defaultChecked: false,
          },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <Label htmlFor={item.id} className="text-sm font-medium">
                {item.title}
              </Label>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
            <Switch id={item.id} defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
