import Link from "next/link";
import { Calculator, Droplets, Dumbbell, Plus, Scale } from "lucide-react";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const actions = [
  { href: ROUTES.dashboardProgress, label: "Log weight", icon: Scale },
  { href: ROUTES.dashboardProgress, label: "Add water", icon: Droplets },
  { href: ROUTES.workouts, label: "Start workout", icon: Dumbbell },
  { href: ROUTES.calculators, label: "Calculators", icon: Calculator },
];

export function QuickActions() {
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Quick actions</h2>
        <Plus className="text-muted-foreground h-4 w-4" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map(({ href, label, icon: Icon }) => (
          <Button key={label} asChild variant="outline" className="h-auto justify-start gap-2 py-3">
            <Link href={href}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </Button>
        ))}
      </div>
    </GlassCard>
  );
}
