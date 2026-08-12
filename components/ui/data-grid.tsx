import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";

export type DataGridColumn<T> = {
  key: keyof T | string;
  header: string;
  cell?: (row: T) => ReactNode;
  className?: string;
};

type DataGridProps<T extends Record<string, unknown>> = {
  columns: DataGridColumn<T>[];
  data: T[];
  emptyTitle?: string;
  emptyDescription?: string;
  getRowId?: (row: T, index: number) => string;
};

/**
 * Lightweight reusable data grid placeholder.
 * Replace with TanStack Table when advanced sorting/filtering is needed.
 */
export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  emptyTitle = "No data",
  emptyDescription = "There is nothing to display yet.",
  getRowId,
}: DataGridProps<T>) {
  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={getRowId?.(row, index) ?? String(index)}>
            {columns.map((column) => (
              <TableCell key={String(column.key)} className={column.className}>
                {column.cell ? column.cell(row) : (row[column.key as keyof T] as ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
