"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Bell } from "lucide-react";
import {
  actionMarkAllNotificationsRead,
  actionMarkNotificationRead,
} from "@/features/dashboard/actions";
import type { NotificationEntry } from "@/features/dashboard/types";
import { formatRelative } from "@/features/dashboard/utils";
import { GlassCard } from "@/components/home/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

export function NotificationsClient({ items }: { items: NotificationEntry[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  if (!items.length) {
    return (
      <EmptyState
        title="No notifications"
        description="Workout, water, and goal reminders will show up here."
        icon={<Bell className="text-muted-foreground h-6 w-6" />}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await actionMarkAllNotificationsRead();
              router.refresh();
            })
          }
        >
          Mark all read
        </Button>
      </div>
      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.id}>
            <GlassCard
              className={cn("p-4 transition-all", !n.read && "border-primary/30 bg-primary/5")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <p className="font-medium">{n.title}</p>
                    <Badge variant="outline">{n.type.replaceAll("_", " ")}</Badge>
                    {!n.read ? <Badge>New</Badge> : null}
                  </div>
                  {n.body ? <p className="text-muted-foreground text-sm">{n.body}</p> : null}
                  <p className="text-muted-foreground mt-2 text-xs">
                    {formatRelative(n.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  {n.href ? (
                    <Button asChild size="sm" variant="secondary">
                      <Link href={n.href}>Open</Link>
                    </Button>
                  ) : null}
                  {!n.read ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={pending}
                      onClick={() =>
                        start(async () => {
                          await actionMarkNotificationRead(n.id);
                          router.refresh();
                        })
                      }
                    >
                      Mark read
                    </Button>
                  ) : null}
                </div>
              </div>
            </GlassCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
