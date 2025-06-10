
import { useState, useMemo } from 'react';

export interface ColumnConfig {
  id: string;
  priority: 'essential' | 'important' | 'optional';
  minWidth: number;
  defaultWidth: number;
  maxWidth?: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

export interface UseTableStateProps<T> {
  data: T[];
  pageSize?: number;
  searchFields?: (keyof T)[];
  filterFunctions?: Record<string, (item: T, filterValues: string[]) => boolean>;
  columnConfigs?: ColumnConfig[];
}

export function useTableState<T>({
  data,
  pageSize = 20,
  searchFields = [],
  filterFunctions = {},
  columnConfigs = [],
}: UseTableStateProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchValue.trim() && searchFields.length > 0) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply filters
    Object.entries(selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues.length > 0 && filterFunctions[filterKey]) {
        filtered = filtered.filter((item) =>
          filterFunctions[filterKey](item, filterValues)
        );
      }
    });

    return filtered;
  }, [data, searchValue, searchFields, selectedFilters, filterFunctions]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSizeState;
    const endIndex = startIndex + pageSizeState;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSizeState]);

  const totalPages = Math.ceil(filteredData.length / pageSizeState);

  // Get responsive column visibility
  const getVisibleColumns = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
    return columnConfigs.filter(config => {
      if (hiddenColumns.includes(config.id)) return false;
      if (screenSize === 'mobile' && config.hideOnMobile) return false;
      if (screenSize === 'tablet' && config.hideOnTablet) return false;
      return true;
    });
  };

  // Reset page when filters or search change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (groupId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupId]: values,
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSizeState(newPageSize);
    setCurrentPage(1);
  };

  const handleColumnResize = (columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  };

  const handleHideColumn = (columnId: string) => {
    setHiddenColumns(prev => [...prev, columnId]);
  };

  const handleShowColumn = (columnId: string) => {
    setHiddenColumns(prev => prev.filter(id => id !== columnId));
  };

  return {
    // Data
    filteredData,
    paginatedData,
    
    // Pagination
    currentPage,
    totalPages,
    pageSize: pageSizeState,
    totalItems: filteredData.length,
    setCurrentPage,
    handlePageSizeChange,
    
    // Search
    searchValue,
    handleSearchChange,
    
    // Filters
    selectedFilters,
    handleFilterChange,
    handleClearFilters,
    
    // Columns
    hiddenColumns,
    columnWidths,
    handleColumnResize,
    handleHideColumn,
    handleShowColumn,
    getVisibleColumns,
  };
}
