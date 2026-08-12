import Link from "next/link";
import { GlassCard } from "@/components/home/glass-card";
import { formatRelative } from "@/features/dashboard/utils";
import type { ActivityItem } from "@/features/dashboard/types";
import { EmptyState } from "@/components/shared/empty-state";

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (!items.length) {
    return (
      <GlassCard className="p-5">
        <EmptyState
          title="No activity yet"
          description="Logs and calculator runs will appear here."
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <h2 className="font-display mb-4 text-lg font-semibold">Recent activity</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-border/50 flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
          >
            <div>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <p className="text-sm font-medium">{item.label}</p>
              )}
              <p className="text-muted-foreground text-xs">{item.detail}</p>
            </div>
            <time className="text-muted-foreground shrink-0 text-[11px]">
              {formatRelative(item.at)}
            </time>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
