
import React from 'react';
import { SearchBar } from '../SearchBar';
import { TableFilters, FilterGroup } from './TableFilters';
import { ColumnVisibilityMenu } from './ColumnVisibilityMenu';
import { AddColumnMenu } from '../AddColumnMenu';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, values: string[]) => void;
  onClearFilters?: () => void;
  rightContent?: React.ReactNode;
  hiddenColumns?: string[];
  onShowColumn?: (columnId: string) => void;
  onHideColumn?: (columnId: string) => void;
  availableColumns?: Array<{ id: string; label: string; }>;
  onAddColumn?: (columnType: string) => void;
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
  hiddenColumns = [],
  onShowColumn = () => {},
  onHideColumn = () => {},
  availableColumns = [],
  onAddColumn = () => {},
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
        {availableColumns.length > 0 && (
          <ColumnVisibilityMenu
            availableColumns={availableColumns}
            hiddenColumns={hiddenColumns}
            onShowColumn={onShowColumn}
            onHideColumn={onHideColumn}
          />
        )}
        <AddColumnMenu onAddColumn={onAddColumn} />
      </div>
      {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
    </div>
  );
}
