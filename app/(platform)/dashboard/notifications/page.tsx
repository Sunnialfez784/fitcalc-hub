import { getNotifications } from "@/features/dashboard/services";
import { NotificationsClient } from "@/components/dashboard/notifications-list";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Notifications",
  description: "Workout, water, and goal reminders.",
  path: "/dashboard/notifications",
  noIndex: true,
});

export default async function NotificationsPage() {
  const items = await getNotifications();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Placeholder reminder system — ready for push/email later.
        </p>
      </header>
      <NotificationsClient items={items} />
    </div>
  );
}
