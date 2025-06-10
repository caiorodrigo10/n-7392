
import React from 'react';
import { SearchBar } from '../SearchBar';
import { TableFilters, FilterGroup } from './TableFilters';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, values: string[]) => void;
  onClearFilters?: () => void;
  rightContent?: React.ReactNode;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterGroups = [],
  selectedFilters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
  rightContent,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>
        {filterGroups.length > 0 && (
          <TableFilters
            filterGroups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        )}
      </div>
      {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
    </div>
  );
}
