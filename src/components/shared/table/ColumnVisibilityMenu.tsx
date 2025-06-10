
import React from 'react';
import { Eye, EyeOff, Columns } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnVisibilityMenuProps {
  availableColumns: Array<{ id: string; label: string; }>;
  hiddenColumns: string[];
  onShowColumn: (columnId: string) => void;
  onHideColumn: (columnId: string) => void;
}

export function ColumnVisibilityMenu({
  availableColumns,
  hiddenColumns,
  onShowColumn,
  onHideColumn,
}: ColumnVisibilityMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Columns className="h-4 w-4 mr-2" />
          Columns
          {hiddenColumns.length > 0 && (
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
              {hiddenColumns.length} hidden
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableColumns.map((column) => {
          const isVisible = !hiddenColumns.includes(column.id);
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={isVisible}
              onCheckedChange={(checked) => {
                if (checked) {
                  onShowColumn(column.id);
                } else {
                  onHideColumn(column.id);
                }
              }}
              className="flex items-center gap-2"
            >
              {isVisible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              {column.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
