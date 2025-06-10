
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface TableFiltersProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearFilters: () => void;
}

export function TableFilters({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: TableFiltersProps) {
  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (acc, filters) => acc + filters.length,
    0
  );

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {filterGroups.map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              {group.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.id}
                  checked={selectedFilters[group.id]?.includes(option.value) || false}
                  onCheckedChange={(checked) => {
                    const currentFilters = selectedFilters[group.id] || [];
                    const newFilters = checked
                      ? [...currentFilters, option.value]
                      : currentFilters.filter((f) => f !== option.value);
                    onFilterChange(group.id, newFilters);
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      {option.count}
                    </span>
                  )}
                </DropdownMenuCheckboxItem>
              ))}
              {groupIndex < filterGroups.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
          {totalActiveFilters > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="w-full h-7 text-xs"
                >
                  Clear all filters
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {totalActiveFilters > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-8 px-2 text-xs"
        >
          Clear ({totalActiveFilters})
        </Button>
      )}
    </div>
  );
}
