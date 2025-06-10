
import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "./cells/StatusBadge";
import { CurrencyCell } from "./cells/CurrencyCell";
import { DateCell } from "./cells/DateCell";
import { ActionButtons } from "./cells/ActionButtons";
import { ResponsiveColumnHeader } from "./ResponsiveColumnHeader";

export const contactColumnConfigs = [
  { id: "select", priority: "essential" as const, minWidth: 40, defaultWidth: 40, hideOnMobile: false },
  { id: "name", priority: "essential" as const, minWidth: 180, defaultWidth: 220, hideOnMobile: false },
  { id: "email", priority: "important" as const, minWidth: 200, defaultWidth: 240, hideOnMobile: true },
  { id: "location", priority: "important" as const, minWidth: 150, defaultWidth: 180, hideOnMobile: true },
  { id: "status", priority: "essential" as const, minWidth: 100, defaultWidth: 120, hideOnMobile: false },
  { id: "balance", priority: "important" as const, minWidth: 100, defaultWidth: 130, hideOnMobile: true },
  { id: "department", priority: "optional" as const, minWidth: 120, defaultWidth: 150, hideOnMobile: true, hideOnTablet: true },
  { id: "role", priority: "optional" as const, minWidth: 120, defaultWidth: 150, hideOnMobile: true, hideOnTablet: true },
  { id: "joinDate", priority: "optional" as const, minWidth: 100, defaultWidth: 130, hideOnMobile: true, hideOnTablet: true },
  { id: "lastActive", priority: "important" as const, minWidth: 100, defaultWidth: 130, hideOnMobile: true },
  { id: "performance", priority: "optional" as const, minWidth: 100, defaultWidth: 130, hideOnMobile: true, hideOnTablet: true },
  { id: "actions", priority: "essential" as const, minWidth: 60, defaultWidth: 60, hideOnMobile: false },
];

export const contactColumns: ColumnDef<Contact>[] = [
  {
    id: "select",
    size: 40,
    minSize: 40,
    maxSize: 40,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] ml-[6px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] ml-[6px]"
      />
    ),
    enableSorting: false,
    enableResizing: false,
  },
  {
    header: "Full Name",
    accessorKey: "name",
    size: 220,
    minSize: 180,
    maxSize: 300,
    cell: ({ row }) => (
      <div className="truncate font-medium px-1">{row.getValue("name")}</div>
    ),
  },
  {
    header: "Email Address",
    accessorKey: "email",
    size: 240,
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => (
      <div className="truncate text-xs px-1">{row.getValue("email")}</div>
    ),
  },
  {
    header: "Location",
    accessorKey: "location",
    size: 180,
    minSize: 150,
    maxSize: 220,
    cell: ({ row }) => (
      <div className="truncate px-1">
        <span className="text-sm leading-none mr-1">{row.original.flag}</span>
        <span className="text-xs">{row.getValue("location")}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 120,
    minSize: 100,
    maxSize: 150,
    cell: ({ row }) => (
      <div className="px-1">
        <StatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    header: "Balance",
    accessorKey: "balance",
    size: 130,
    minSize: 100,
    maxSize: 160,
    cell: ({ row }) => (
      <div className="px-1">
        <CurrencyCell amount={row.getValue("balance")} />
      </div>
    ),
  },
  {
    header: "Department",
    accessorKey: "department",
    size: 150,
    minSize: 120,
    maxSize: 180,
    cell: ({ row }) => (
      <div className="truncate text-xs px-1">{row.getValue("department")}</div>
    ),
  },
  {
    header: "Role",
    accessorKey: "role",
    size: 150,
    minSize: 120,
    maxSize: 180,
    cell: ({ row }) => (
      <div className="truncate text-xs px-1">{row.getValue("role")}</div>
    ),
  },
  {
    header: "Join Date",
    accessorKey: "joinDate",
    size: 130,
    minSize: 100,
    maxSize: 150,
    cell: ({ row }) => (
      <div className="px-1">
        <DateCell date={row.getValue("joinDate")} formatType="short" />
      </div>
    ),
  },
  {
    header: "Last Active",
    accessorKey: "lastActive",
    size: 130,
    minSize: 100,
    maxSize: 150,
    cell: ({ row }) => (
      <div className="px-1">
        <DateCell date={row.getValue("lastActive")} formatType="relative" />
      </div>
    ),
  },
  {
    header: "Performance",
    accessorKey: "performance",
    size: 130,
    minSize: 100,
    maxSize: 160,
    cell: ({ row }) => (
      <div className="px-1">
        <StatusBadge status={row.getValue("performance")} />
      </div>
    ),
  },
  {
    id: "actions",
    size: 60,
    minSize: 60,
    maxSize: 60,
    header: "",
    cell: ({ row }) => (
      <div className="px-1">
        <ActionButtons
          onView={() => console.log("View contact", row.original.id)}
          onEdit={() => console.log("Edit contact", row.original.id)}
          onDelete={() => console.log("Delete contact", row.original.id)}
        />
      </div>
    ),
    enableSorting: false,
    enableResizing: false,
  },
];
