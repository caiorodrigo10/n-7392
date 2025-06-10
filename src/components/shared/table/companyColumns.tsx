
import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Users } from "lucide-react";
import { ScoreBadge } from "./cells/ScoreBadge";
import { SocialLinks } from "./cells/SocialLinks";
import { DateCell } from "./cells/DateCell";
import { ActionButtons } from "./cells/ActionButtons";

export const companyColumns: ColumnDef<Company>[] = [
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
      <div className="font-medium truncate">{row.getValue("name")}</div>
    ),
  },
  {
    header: "Website",
    accessorKey: "website",
    size: 250,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <a 
          href={row.getValue("website")} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline truncate text-sm"
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
    cell: ({ row }) => (
      <DateCell date={row.getValue("lastActivity")} formatType="relative" />
    ),
  },
  {
    header: "Linked Contacts",
    accessorKey: "linkedContacts",
    size: 140,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.getValue("linkedContacts")}</span>
      </div>
    ),
  },
  {
    header: "Score",
    accessorKey: "score",
    size: 100,
    cell: ({ row }) => (
      <ScoreBadge score={Number(row.getValue("score"))} />
    ),
  },
  {
    header: "Social Media",
    id: "social",
    size: 150,
    cell: ({ row }) => (
      <SocialLinks
        links={{
          linkedin: row.original.linkedin,
          instagram: row.original.instagram,
          twitter: row.original.twitter,
        }}
      />
    ),
  },
  {
    header: "Employees",
    accessorKey: "employees",
    size: 120,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.getValue("employees")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    size: 50,
    header: "",
    cell: ({ row }) => (
      <ActionButtons
        onView={() => console.log("View company", row.original.id)}
        onEdit={() => console.log("Edit company", row.original.id)}
        onDelete={() => console.log("Delete company", row.original.id)}
      />
    ),
    enableSorting: false,
    enableResizing: false,
  },
];
