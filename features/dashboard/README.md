# Dashboard & Progress Tracking

User dashboard for FitCalc Hub — overview, metrics, goals, history, saved content, profile, notifications.

## Routes

| Path                       | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `/dashboard`               | Home — welcome, daily summary, cards, charts, activity, recommendations |
| `/dashboard/progress`      | Log metrics, goals, all Recharts views                                  |
| `/dashboard/history`       | Calculator / workout / diet / weight / BMI / water logs                 |
| `/dashboard/saved`         | Saved articles, calculators, workouts, diets, recipes                   |
| `/dashboard/profile`       | Editable profile                                                        |
| `/dashboard/settings`      | Reminder preference placeholders                                        |
| `/dashboard/notifications` | Workout / water / goal reminders                                        |

Demo data powers the UI until Auth.js + Postgres are connected.

## Architecture

```
features/dashboard/
  metrics/registry.ts   ← add new tracking modules here
  data/sample.ts        ← demo seed
  services/             ← in-memory + prisma stubs
  types/ utils/ actions/

components/dashboard/   ← reusable shell, cards, charts, tables, forms
```

## Add a new tracking module (no dashboard rewrite)

1. **Register the metric** in `features/dashboard/metrics/registry.ts`:

```ts
registerMetric({
  id: "waist", // extend MetricId in types if needed
  label: "Waist",
  shortLabel: "Waist",
  unit: "cm",
  description: "Waist circumference",
  icon: Ruler,
  color: "oklch(0.55 0.1 200)",
  dashboardCard: true,
  historyKey: "waist",
});
```

2. **Seed series** in `data/sample.ts` (`SAMPLE_METRIC_SERIES`).

3. **Optional Prisma model** (e.g. `WaistLog`) + helper in `services/prisma-dashboard.ts`.

4. Progress page charts auto-include anything in `listAllMetrics()`. Home cards follow `dashboardCard: true`.

The shell (`DashboardShell`), history tabs, and chart panels stay unchanged — they read the registry.

## Wire real auth later

Swap in-memory calls for `prisma*` helpers using `session.user.id`. Keep the same service function names so pages do not change.
