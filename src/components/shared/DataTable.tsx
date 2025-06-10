
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { AddCalculationButton } from "./AddCalculationButton";
import { TablePagination } from "./table/TablePagination";
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
import { ColumnHeaderMenu } from "./ColumnHeaderMenu";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPagination?: boolean;
}

export function DataTable<T>({ 
  columns, 
  data, 
  onRowSelectionChange,
  currentPage = 1,
  totalPages = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  showPagination = false,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [columnLabels, setColumnLabels] = useState<Record<string, string>>({});

  // Filter out hidden columns
  const visibleColumns = columns.filter(col => 
    !hiddenColumns.includes(col.id || (col as any).accessorKey as string)
  );

  // Define default column widths based on ID/type
  const columnsWithDefaultSize = visibleColumns.map(col => {
    let defaultSize = 200; // Default size for most columns

    // Special columns by ID
    if (col.id === 'select') {
      defaultSize = 40;
    }
    // Special columns by accessorKey
    else if ((col as any).accessorKey === 'name') {
      defaultSize = 250;
    }
    else if ((col as any).accessorKey === 'email' || (col as any).accessorKey === 'website') {
      defaultSize = 250;
    }
    // Columns with badges/tags
    else if (
      (col as any).accessorKey === 'status' || 
      (col as any).accessorKey === 'performance' ||
      (typeof col.cell === 'function' && col.cell.toString().includes('rounded-full'))
    ) {
      defaultSize = 180;
    }

    return {
      ...col,
      size: col.size || defaultSize,
    };
  });

  const table = useReactTable({
    data,
    columns: columnsWithDefaultSize,
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
    <div className="relative rounded-md border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white h-6">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "relative select-none h-6 py-0 border-r border-b",
                      header.id === "select" && "w-[40px] px-0 sticky left-0 z-20 bg-white border-l-0"
                    )}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                      maxWidth: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : header.id === "select" ? (
                      <div className="flex items-center justify-center h-full">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    ) : (
                      <ColumnHeaderMenu 
                        header={header}
                        onEditLabel={() => {
                          const columnId = header.id || (header.column as any).accessorKey as string;
                          const currentLabel = columnLabels[columnId] || header.column.columnDef.header;
                          const newLabel = window.prompt("Enter new column label:", currentLabel as string);
                          
                          if (newLabel && newLabel !== currentLabel) {
                            setColumnLabels(prev => ({
                              ...prev,
                              [columnId]: newLabel
                            }));
                          }
                        }}
                        onHideColumn={() => {
                          const columnId = header.id || (header.column as any).accessorKey as string;
                          setHiddenColumns(prev => [...prev, columnId]);
                        }}
                      />
                    )}
                    {header.column.getCanResize() && header.id !== "select" && (
                      <div
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:right-2"
                      />
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
                  className={cn("h-6", row.getIsSelected() && "bg-muted/50")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "truncate relative font-medium h-6 py-1 border-r",
                        cell.column.id === "select" && "w-[40px] px-0 sticky left-0 z-20 bg-white border-l-0"
                      )}
                      style={{ 
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                      }}
                    >
                      {cell.column.id === "select" ? (
                        <div className="flex items-center justify-center h-full">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="border-t hover:bg-transparent h-6">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <TableCell
                  key={header.id}
                  className={cn(
                    "py-1 text-xs text-muted-foreground font-normal relative h-6 border-r",
                    header.id === "select" && "w-[40px] px-0 sticky left-0 z-20 bg-white border-l-0"
                  )}
                  style={{ 
                    width: header.getSize(),
                    minWidth: header.getSize(),
                    maxWidth: header.getSize(),
                  }}
                >
                  {header.id === "select" ? null : (
                    <AddCalculationButton onClick={() => console.log(`Add calculation for ${header.id}`)} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      
      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
