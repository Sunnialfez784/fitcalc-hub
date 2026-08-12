"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bookmark,
  Dumbbell,
  History,
  LayoutDashboard,
  LineChart,
  Settings,
  User,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { href: ROUTES.dashboard, label: "Overview", icon: LayoutDashboard, exact: true },
  { href: ROUTES.dashboardWorkouts, label: "Workouts", icon: Dumbbell },
  { href: ROUTES.dashboardProgress, label: "Progress", icon: LineChart },
  { href: ROUTES.dashboardHistory, label: "History", icon: History },
  { href: ROUTES.dashboardSaved, label: "Saved", icon: Bookmark },
  { href: ROUTES.dashboardProfile, label: "Profile", icon: User },
  { href: ROUTES.dashboardNotifications, label: "Alerts", icon: Bell },
  { href: ROUTES.dashboardSettings, label: "Settings", icon: Settings },
];

export function DashboardNav({ unread = 0 }: { unread?: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {href === ROUTES.dashboardNotifications && unread > 0 ? (
              <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                {unread}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
