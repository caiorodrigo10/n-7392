
import React from 'react';
import { Header } from '@tanstack/react-table';
import { MoreHorizontal, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ResponsiveColumnHeaderProps<T> {
  header: Header<T, unknown>;
  onEditLabel?: () => void;
  onHideColumn?: () => void;
  onShowColumn?: (columnId: string) => void;
  hiddenColumns?: string[];
  fullLabel?: string;
  abbreviatedLabel?: string;
}

export function ResponsiveColumnHeader<T>({
  header,
  onEditLabel,
  onHideColumn,
  onShowColumn,
  hiddenColumns = [],
  fullLabel,
  abbreviatedLabel,
}: ResponsiveColumnHeaderProps<T>) {
  const displayLabel = abbreviatedLabel || fullLabel || header.column.columnDef.header?.toString() || '';
  const tooltipLabel = fullLabel || header.column.columnDef.header?.toString() || '';

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 min-w-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm font-medium truncate min-w-0 flex-1">
              {displayLabel}
            </span>
          </TooltipTrigger>
          {tooltipLabel !== displayLabel && (
            <TooltipContent>
              <p>{tooltipLabel}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {onEditLabel && (
            <DropdownMenuItem onClick={onEditLabel}>
              Edit Label
            </DropdownMenuItem>
          )}
          {onHideColumn && (
            <DropdownMenuItem onClick={onHideColumn}>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Column
            </DropdownMenuItem>
          )}
          {hiddenColumns.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Show Columns
              </div>
              {hiddenColumns.map((columnId) => (
                <DropdownMenuItem 
                  key={columnId} 
                  onClick={() => onShowColumn?.(columnId)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {columnId}
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
