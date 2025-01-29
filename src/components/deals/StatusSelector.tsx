import { Check, Columns, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface StatusSelectorProps {
  visibleStatuses: string[];
  onToggleStatus: (status: string) => void;
}

const statuses = [
  { id: 'won', label: 'Won', color: 'text-[#22C55E]' },
  { id: 'lost', label: 'Lost', color: 'text-[#EF4444]' },
  { id: 'abandoned', label: 'Abandoned', color: 'text-[#6B7280]' },
  { id: 'extended', label: 'Extended', color: 'text-[#60A5FA]' },
];

export const StatusSelector = ({ visibleStatuses, onToggleStatus }: StatusSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="font-medium text-secondary/80 hover:bg-transparent px-0 flex items-center gap-1"
        >
          <Columns className="h-4 w-4" />
          <Plus className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status.id}
            className="flex items-center space-x-2"
            onSelect={(e) => {
              e.preventDefault();
              onToggleStatus(status.id);
            }}
          >
            <Checkbox
              id={status.id}
              checked={visibleStatuses.includes(status.id)}
              className={status.color}
            />
            <span className={`text-sm ${status.color}`}>{status.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};