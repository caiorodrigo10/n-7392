import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Mail, Phone, Building2, Calendar } from "lucide-react";

export const contactColumns: ColumnDef<Contact>[] = [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <div className="flex justify-center items-center h-full ml-[3px]">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center ml-[3px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableResizing: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <div className="truncate font-medium">{row.getValue("name")}</div>,
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