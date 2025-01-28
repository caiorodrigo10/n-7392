import { useState, useEffect } from "react";
import { Search, Plus, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
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

interface ContactsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

type Contact = {
  id: string;
  name: string;
  email: string;
  location: string;
  flag: string;
  status: "Active" | "Inactive" | "Pending";
  balance: number;
  department: string;
  role: string;
  joinDate: string;
  lastActive: string;
  performance: "Excellent" | "Good" | "Average" | "Poor";
};

const mockData: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    location: "New York",
    flag: "🇺🇸",
    status: "Active",
    balance: 5000,
    department: "Sales",
    role: "Manager",
    joinDate: "2023-01-15",
    lastActive: "2024-03-15",
    performance: "Excellent"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    location: "London",
    flag: "🇬🇧",
    status: "Active",
    balance: 4500,
    department: "Marketing",
    role: "Director",
    joinDate: "2023-02-01",
    lastActive: "2024-03-14",
    performance: "Good"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    location: "Toronto",
    flag: "🇨🇦",
    status: "Pending",
    balance: 3500,
    department: "Engineering",
    role: "Developer",
    joinDate: "2023-03-10",
    lastActive: "2024-03-10",
    performance: "Average"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@company.com",
    location: "Sydney",
    flag: "🇦🇺",
    status: "Inactive",
    balance: 2000,
    department: "Support",
    role: "Agent",
    joinDate: "2023-04-20",
    lastActive: "2024-02-28",
    performance: "Poor"
  }
];

const Contacts = ({ isCollapsed, setIsCollapsed }: ContactsProps) => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data] = useState<Contact[]>(mockData);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns: ColumnDef<Contact>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableResizing: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="truncate font-medium">{row.getValue("name")}</div>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }) => (
        <div className="truncate">
          <span className="text-lg leading-none">{row.original.flag}</span> {row.getValue("location")}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          row.getValue("status") === "Active" 
            ? "bg-green-100 text-green-700" 
            : row.getValue("status") === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        )}>
          {row.getValue("status")}
        </div>
      ),
    },
    {
      header: "Balance",
      accessorKey: "balance",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("balance"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Join Date",
      accessorKey: "joinDate",
    },
    {
      header: "Last Active",
      accessorKey: "lastActive",
    },
    {
      header: "Performance",
      accessorKey: "performance",
      cell: ({ row }) => (
        <div className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          {
            "bg-green-100 text-green-700": row.getValue("performance") === "Excellent",
            "bg-blue-100 text-blue-700": row.getValue("performance") === "Good",
            "bg-yellow-100 text-yellow-700": row.getValue("performance") === "Average",
            "bg-red-100 text-red-700": row.getValue("performance") === "Poor",
          }
        )}>
          {row.getValue("performance")}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Contacts</h1>
            <p className="text-gray-600 mt-1">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
            <Plus className="h-5 w-5" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

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
                        header.column.getCanSort() && "cursor-pointer"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp className="h-4 w-4" />,
                          desc: <ChevronDown className="h-4 w-4" />,
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
                    className={cn(
                      row.getIsSelected() && "bg-muted/50",
                      "hover:bg-muted/50 cursor-pointer"
                    )}
                    onClick={() => row.toggleSelected()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="truncate">
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
      </div>
    </Layout>
  );
};

export default Contacts;
