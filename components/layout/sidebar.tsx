"use client";

import Link from "next/link";
import {
  Bell,
  Bookmark,
  History,
  LayoutDashboard,
  LineChart,
  Settings,
  User,
  Calculator,
  Dumbbell,
  Salad,
  BookOpen,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.dashboardProgress, label: "Progress", icon: LineChart },
  { href: ROUTES.dashboardHistory, label: "History", icon: History },
  { href: ROUTES.dashboardSaved, label: "Saved", icon: Bookmark },
  { href: ROUTES.dashboardProfile, label: "Profile", icon: User },
  { href: ROUTES.dashboardNotifications, label: "Notifications", icon: Bell },
  { href: ROUTES.dashboardSettings, label: "Settings", icon: Settings },
  { href: ROUTES.calculators, label: "Calculators", icon: Calculator },
  { href: ROUTES.workouts, label: "Workouts", icon: Dumbbell },
  { href: ROUTES.dietPlans, label: "Diet Plans", icon: Salad },
  { href: ROUTES.blog, label: "Blog", icon: BookOpen },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-black/40 md:hidden", sidebarOpen ? "block" : "hidden")}
        onClick={() => setSidebarOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "bg-background fixed inset-y-0 left-0 z-50 w-64 border-r p-4 transition-transform md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <p className="text-muted-foreground mb-4 px-2 text-xs font-semibold tracking-wider uppercase">
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
