import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/types/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Globe, Link, Users, ChartBar } from "lucide-react";

export const companyColumns: ColumnDef<Company>[] = [
  {
    id: "select",
    size: 40, // Definindo um tamanho menor para a coluna de checkbox
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
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    header: "Website",
    accessorKey: "website",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <a href={row.getValue("website")} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.getValue("website")}
        </a>
      </div>
    ),
  },
  {
    header: "Last Activity",
    accessorKey: "lastActivity",
  },
  {
    header: "Linked Contacts",
    accessorKey: "linkedContacts",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        {row.getValue("linkedContacts")}
      </div>
    ),
  },
  {
    header: "Score",
    accessorKey: "score",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ChartBar className="h-4 w-4" />
        <div className={cn(
          "font-medium",
          Number(row.getValue("score")) >= 7 ? "text-green-600" :
          Number(row.getValue("score")) >= 4 ? "text-yellow-600" :
          "text-red-600"
        )}>
          {row.getValue("score")}/10
        </div>
      </div>
    ),
  },
  {
    header: "Social Media",
    id: "social",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {row.original.linkedin && (
          <a href={row.original.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <Link className="h-4 w-4" />
          </a>
        )}
        {row.original.instagram && (
          <a href={row.original.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
            <Link className="h-4 w-4" />
          </a>
        )}
        {row.original.twitter && (
          <a href={row.original.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <Link className="h-4 w-4" />
          </a>
        )}
      </div>
    ),
  },
  {
    header: "Employees",
    accessorKey: "employees",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        {row.getValue("employees")}
      </div>
    ),
  },
];