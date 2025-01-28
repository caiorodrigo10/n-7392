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
    columnResizeMode: "onChange",
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
    enableColumnResizing: true,
  });

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="w-full overflow-auto flex-1">
        <Table className="table-fixed" style={{ width: table.getCenterTotalSize() }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "relative h-10 select-none",
                      header.id === "select" && "w-[32px] px-0"
                    )}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex h-full select-none items-center gap-2 px-4",
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
                    )}
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
                        "truncate px-4",
                        cell.column.id === "select" && "w-[32px] px-0"
                      )}
                      style={{ width: cell.column.getSize() }}
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
      <div className="h-2 bg-white border-t relative">
        {table.getHeaderGroups()[0].headers.map((header) => (
          header.column.getCanResize() && header.id !== "select" && (
            <div
              key={header.id}
              onDoubleClick={() => header.column.resetSize()}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none"
              style={{
                left: `${header.getSize() - 8}px`,
                transform: 'translateX(-50%)'
              }}
            />
          )
        ))}
      </div>
    </div>
  );
}