import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
}

export function DataTable<T>({ 
  columns, 
  data, 
  onRowSelectionChange 
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: (updatedSelection) => {
      if (typeof updatedSelection === 'function') {
        const newSelection = updatedSelection(rowSelection);
        setRowSelection(newSelection);
        onRowSelectionChange?.(newSelection);
      } else {
        setRowSelection(updatedSelection);
        onRowSelectionChange?.(updatedSelection);
      }
    },
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableSortingRemoval: false,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "relative h-10 select-none border-t [&>.cursor-col-resize]:last:opacity-0",
                    header.id === "select" && "w-[40px] px-2"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-full select-none items-center gap-2",
                      header.column.getCanSort() && "cursor-pointer justify-between"
                    )}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <span className="truncate">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                    {{
                      asc: <ChevronUp className="shrink-0 opacity-60" size={16} strokeWidth={2} />,
                      desc: <ChevronDown className="shrink-0 opacity-60" size={16} strokeWidth={2} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(row.getIsSelected() && "bg-muted/50")}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "truncate",
                      cell.column.id === "select" && "w-[40px] px-2"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}