"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Recharts chart shell — replace with real charts when analytics ship. */
export function ChartPlaceholder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart placeholder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex h-64 items-center justify-center rounded-md border border-dashed text-sm">
          Recharts visualization will render here
        </div>
      </CardContent>
    </Card>
  );
}
