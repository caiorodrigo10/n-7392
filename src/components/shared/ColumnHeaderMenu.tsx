
import React from 'react';
import { Column, Header } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnHeaderMenuProps<T> {
  header: Header<T, unknown>;
  onEditLabel?: () => void;
  onHideColumn?: () => void;
}

export function ColumnHeaderMenu<T>({
  header,
  onEditLabel,
  onHideColumn,
}: ColumnHeaderMenuProps<T>) {
  return (
    <div className="flex items-center justify-between gap-2 px-4">
      <span className="text-sm font-medium truncate">
        {header.column.columnDef.header?.toString()}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEditLabel}>Edit Label</DropdownMenuItem>
          <DropdownMenuItem onClick={onHideColumn}>Hide Column</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
