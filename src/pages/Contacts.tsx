import { useState } from "react";
import { Search, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
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
} from "@tanstack/react-table";

interface ContactsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: "Active" | "Inactive";
  lastContact: string;
};

const columns: ColumnDef<Contact>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <div className="truncate font-medium">{row.getValue("name")}</div>,
    sortUndefined: "last",
    sortDescFirst: false,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Company",
    accessorKey: "company",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        row.getValue("status") === "Active" 
          ? "bg-green-100 text-green-700" 
          : "bg-red-100 text-red-700"
      )}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    header: "Last Contact",
    accessorKey: "lastContact",
  },
];

const mockData: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    company: "Tech Corp",
    role: "CEO",
    status: "Active",
    lastContact: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@design.co",
    company: "Design Co",
    role: "Designer",
    status: "Active",
    lastContact: "2024-03-14",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.io",
    company: "Startup.io",
    role: "Developer",
    status: "Inactive",
    lastContact: "2024-03-10",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@agency.com",
    company: "Creative Agency",
    role: "Director",
    status: "Active",
    lastContact: "2024-03-13",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@consulting.com",
    company: "Consulting Ltd",
    role: "Consultant",
    status: "Inactive",
    lastContact: "2024-03-08",
  },
];

const Contacts = ({ isCollapsed, setIsCollapsed }: ContactsProps) => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data] = useState<Contact[]>(mockData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    enableSortingRemoval: false,
  });

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Contacts</h1>
            <p className="text-gray-600 mt-1">Manage your contacts and leads</p>
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
                      className="relative h-10 select-none border-t"
                      aria-sort={
                        header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                            ? "descending"
                            : "none"
                      }
                    >
                      <div
                        className={cn(
                          "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                          !header.column.getCanSort() && "cursor-default"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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