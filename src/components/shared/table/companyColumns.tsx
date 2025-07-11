
import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Users } from "lucide-react";
import { ScoreBadge } from "./cells/ScoreBadge";
import { SocialLinks } from "./cells/SocialLinks";
import { DateCell } from "./cells/DateCell";
import { ResponsiveColumnHeader } from "./ResponsiveColumnHeader";

export const companyColumnConfigs = [
  { id: "select", priority: "essential" as const, minWidth: 40, defaultWidth: 40, hideOnMobile: false },
  { id: "name", priority: "essential" as const, minWidth: 180, defaultWidth: 220, hideOnMobile: false },
  { id: "website", priority: "important" as const, minWidth: 200, defaultWidth: 240, hideOnMobile: true },
  { id: "lastActivity", priority: "important" as const, minWidth: 120, defaultWidth: 150, hideOnMobile: true },
  { id: "linkedContacts", priority: "important" as const, minWidth: 120, defaultWidth: 140, hideOnMobile: true },
  { id: "score", priority: "essential" as const, minWidth: 80, defaultWidth: 100, hideOnMobile: false },
  { id: "social", priority: "optional" as const, minWidth: 120, defaultWidth: 150, hideOnMobile: true, hideOnTablet: true },
  { id: "employees", priority: "optional" as const, minWidth: 100, defaultWidth: 120, hideOnMobile: true, hideOnTablet: true },
];

export const companyColumns: ColumnDef<Company>[] = [
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
    header: "Company Name",
    accessorKey: "name",
    size: 220,
    minSize: 180,
    maxSize: 300,
    cell: ({ row }) => (
      <div className="font-medium truncate px-1">{row.getValue("name")}</div>
    ),
  },
  {
    header: "Website",
    accessorKey: "website",
    size: 240,
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => (
      <div className="flex items-center gap-1 px-1">
        <Globe className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <a 
          href={row.getValue("website")} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline truncate text-xs"
        >
          {row.getValue("website")}
        </a>
      </div>
    ),
  },
  {
    header: "Last Activity",
    accessorKey: "lastActivity",
    size: 150,
    minSize: 120,
    maxSize: 180,
    cell: ({ row }) => (
      <div className="px-1">
        <DateCell date={row.getValue("lastActivity")} formatType="relative" />
      </div>
    ),
  },
  {
    header: "Contacts",
    accessorKey: "linkedContacts",
    size: 140,
    minSize: 120,
    maxSize: 160,
    cell: ({ row }) => (
      <div className="flex items-center gap-1 px-1">
        <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <span className="text-xs">{row.getValue("linkedContacts")}</span>
      </div>
    ),
  },
  {
    header: "Score",
    accessorKey: "score",
    size: 100,
    minSize: 80,
    maxSize: 120,
    cell: ({ row }) => (
      <div className="px-1">
        <ScoreBadge score={Number(row.getValue("score"))} />
      </div>
    ),
  },
  {
    header: "Social",
    id: "social",
    size: 150,
    minSize: 120,
    maxSize: 180,
    cell: ({ row }) => (
      <div className="px-1">
        <SocialLinks
          links={{
            linkedin: row.original.linkedin,
            instagram: row.original.instagram,
            twitter: row.original.twitter,
          }}
        />
      </div>
    ),
  },
  {
    header: "Employees",
    accessorKey: "employees",
    size: 120,
    minSize: 100,
    maxSize: 140,
    cell: ({ row }) => (
      <div className="flex items-center gap-1 px-1">
        <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <span className="text-xs">{row.getValue("employees")}</span>
      </div>
    ),
  },
];
