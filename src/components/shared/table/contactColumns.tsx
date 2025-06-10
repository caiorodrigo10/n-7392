
import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "./cells/StatusBadge";
import { CurrencyCell } from "./cells/CurrencyCell";
import { DateCell } from "./cells/DateCell";
import { ActionButtons } from "./cells/ActionButtons";

export const contactColumns: ColumnDef<Contact>[] = [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] ml-[3px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] ml-[3px]"
      />
    ),
    enableSorting: false,
    enableResizing: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    size: 250,
    cell: ({ row }) => (
      <div className="truncate font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 250,
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    header: "Location",
    accessorKey: "location",
    size: 200,
    cell: ({ row }) => (
      <div className="truncate">
        <span className="text-lg leading-none mr-2">{row.original.flag}</span>
        <span className="text-sm">{row.getValue("location")}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 120,
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status")} />
    ),
  },
  {
    header: "Balance",
    accessorKey: "balance",
    size: 130,
    cell: ({ row }) => (
      <CurrencyCell amount={row.getValue("balance")} />
    ),
  },
  {
    header: "Department",
    accessorKey: "department",
    size: 150,
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("department")}</div>
    ),
  },
  {
    header: "Role",
    accessorKey: "role",
    size: 150,
    cell: ({ row }) => (
      <div className="truncate text-sm">{row.getValue("role")}</div>
    ),
  },
  {
    header: "Join Date",
    accessorKey: "joinDate",
    size: 130,
    cell: ({ row }) => (
      <DateCell date={row.getValue("joinDate")} formatType="short" />
    ),
  },
  {
    header: "Last Active",
    accessorKey: "lastActive",
    size: 130,
    cell: ({ row }) => (
      <DateCell date={row.getValue("lastActive")} formatType="relative" />
    ),
  },
  {
    header: "Performance",
    accessorKey: "performance",
    size: 130,
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("performance")} />
    ),
  },
  {
    id: "actions",
    size: 50,
    header: "",
    cell: ({ row }) => (
      <ActionButtons
        onView={() => console.log("View contact", row.original.id)}
        onEdit={() => console.log("Edit contact", row.original.id)}
        onDelete={() => console.log("Delete contact", row.original.id)}
      />
    ),
    enableSorting: false,
    enableResizing: false,
  },
];
