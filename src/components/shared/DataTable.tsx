import { useState } from "react";
import { Plus } from "lucide-react";
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
import { AddColumnMenu } from "./AddColumnMenu";

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

  // Filtrar colunas ocultas
  const visibleColumns = [
    ...columns.filter(col => !hiddenColumns.includes(col.id || (col as any).accessorKey as string)),
    {
      id: 'addColumn',
      size: 200,
      minSize: 200,
      maxSize: 1000,
      enableResizing: false,
      header: () => (
        <div className="h-6 flex items-center gap-2 px-4 min-w-[200px] border-r">
          <AddColumnMenu onAddColumn={(type) => console.log(`Add ${type} column`)} />
        </div>
      ),
      cell: ({ row }) => (
        <div className="h-full min-w-[200px] border-r" />
      ),
      footer: () => null
    }
  ];

  // Define default column widths based on ID/type
  const columnsWithDefaultSize = visibleColumns.map(col => {
    let defaultSize = 200; // Default size for most columns

    // Special columns by ID
    if (col.id === 'select') {
      defaultSize = 40;
    }
    // Special columns by accessorKey
    else if ((col as any).accessorKey === 'name') {
      defaultSize = 250; // Adjusted size for smaller avatar
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
      size: col.size || defaultSize, // Mantém o tamanho definido se já existir
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
        <div className="min-w-full border-separate border-spacing-0">
          <Table className="table-fixed w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-white h-6">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "relative select-none [&>.cursor-col-resize]:last:opacity-0 h-6 py-0",
                        header.id === "select" && "w-[32px] px-0 sticky left-0 z-20 bg-white",
                        header.id === "name" && "sticky left-[32px] z-20 bg-white",
                        header.id !== "select" && "border-r border-b"
                      )}
                      style={{
                        width: header.id === 'addColumn' ? '100%' : header.getSize(),
                        flex: header.id === 'addColumn' ? '1' : undefined,
                        height: '24px'
                      }}
                    >
                      {header.isPlaceholder ? null : header.id === "select" || header.id === "addColumn" ? (
                        flexRender(header.column.columnDef.header, header.getContext())
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
                          "truncate relative font-medium h-6 py-1",
                          cell.column.id === "select" && "w-[32px] px-0 sticky left-0 z-20 bg-white",
                          cell.column.id === "name" && "sticky left-[32px] z-20 bg-white",
                          cell.column.id !== "select" && "border-r"
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
            <TableFooter>
              <TableRow className="border-t hover:bg-transparent h-6">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className={cn(
                      "py-1 text-xs text-muted-foreground font-normal relative h-6",
                      header.id === "select" && "w-[32px] px-0 sticky left-0 z-20 bg-white",
                      header.id === "name" && "sticky left-[32px] z-20 bg-white",
                      header.id !== "select" && "before:absolute before:right-0 before:top-0 before:h-full before:w-px before:bg-border"
                    )}
                    style={{ width: header.getSize() }}
                  >
                    {header.id === "select" ? null : header.id === "name" ? (
                      <div className="flex justify-end w-full overflow-hidden">
                        <span className="text-xs text-muted-foreground truncate min-w-0">{table.getFilteredRowModel().rows.length} count</span>
                      </div>
                    ) : header.id === "addColumn" ? null : (
                      <AddCalculationButton onClick={() => console.log(`Add calculation for ${header.id}`)} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          </Table>
        </div>
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
