import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/home/glass-card";
import { DashboardNav } from "./dashboard-nav";

type DashboardShellProps = {
  children: React.ReactNode;
  unread?: number;
};

export function DashboardShell({ children, unread = 0 }: DashboardShellProps) {
  return (
    <div className="relative min-h-[70vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_10%_-10%,oklch(0.55_0.14_155/0.12),transparent_55%)]" />
      <Container className="relative py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard className="p-3">
              <p className="text-muted-foreground mb-2 px-2 text-[11px] font-semibold tracking-wider uppercase">
                Dashboard
              </p>
              <DashboardNav unread={unread} />
            </GlassCard>
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
