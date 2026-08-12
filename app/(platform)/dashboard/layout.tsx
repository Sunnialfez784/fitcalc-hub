import { getNotifications } from "@/features/dashboard/services";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Track your fitness progress on FitCalc Hub.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const notifications = await getNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  return <DashboardShell unread={unread}>{children}</DashboardShell>;
}
