import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlassCard } from "@/components/home/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

export type HistoryColumn = {
  key: string;
  header: string;
  className?: string;
};

type HistoryTableProps = {
  title?: string;
  columns: HistoryColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

export function HistoryTable({
  title,
  columns,
  rows,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Your logs will show up as you track progress.",
  className,
}: HistoryTableProps) {
  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      {title ? (
        <div className="border-b px-5 py-4">
          <h3 className="font-display font-semibold">{title}</h3>
        </div>
      ) : null}
      {rows.length === 0 ? (
        <div className="p-6">
          <EmptyState title={emptyTitle} description={emptyDescription} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key} className={c.className}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={c.key} className={c.className}>
                    {row[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </GlassCard>
  );
}
