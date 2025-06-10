
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AddColumnMenuProps {
  onAddColumn?: (columnType: string) => void;
}

export function AddColumnMenu({ onAddColumn }: AddColumnMenuProps) {
  const columnTypes = [
    { id: 'text', label: 'Text', description: 'Single line text' },
    { id: 'number', label: 'Number', description: 'Numbers, currency, percentage' },
    { id: 'date', label: 'Date', description: 'Date picker' },
    { id: 'status', label: 'Status', description: 'Status badges' },
    { id: 'select', label: 'Select', description: 'Dropdown options' },
    { id: 'checkbox', label: 'Checkbox', description: 'True/false values' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-full justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add column
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {columnTypes.map((type, index) => (
          <div key={type.id}>
            <DropdownMenuItem
              onClick={() => onAddColumn?.(type.id)}
              className="flex flex-col items-start py-2"
            >
              <span className="font-medium">{type.label}</span>
              <span className="text-xs text-muted-foreground">{type.description}</span>
            </DropdownMenuItem>
            {index < columnTypes.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
