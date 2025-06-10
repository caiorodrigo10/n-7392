
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableContainer } from "@/components/shared/TableContainer";
import { TableToolbar } from "@/components/shared/table/TableToolbar";
import { companyColumns, companyColumnConfigs } from "@/components/shared/table/companyColumns";
import { useCompanies } from "@/hooks/useCompanies";
import { useTableState } from "@/hooks/useTableState";

interface CompaniesProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Companies = ({ isCollapsed, setIsCollapsed }: CompaniesProps) => {
  const { companies, handleAddCompany } = useCompanies();

  const {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    searchValue,
    handleSearchChange,
    selectedFilters,
    handleFilterChange,
    handleClearFilters,
    setCurrentPage,
    handlePageSizeChange,
    hiddenColumns,
    handleHideColumn,
    handleShowColumn,
  } = useTableState({
    data: companies,
    pageSize: 20,
    searchFields: ['name', 'website'],
    columnConfigs: companyColumnConfigs,
  });

  const availableColumns = companyColumnConfigs
    .filter(config => config.id !== 'select' && config.id !== 'actions')
    .map(config => ({
      id: config.id,
      label: config.id === 'name' ? 'Company Name' :
             config.id === 'website' ? 'Website' :
             config.id === 'lastActivity' ? 'Last Activity' :
             config.id === 'linkedContacts' ? 'Linked Contacts' :
             config.id === 'score' ? 'Score' :
             config.id === 'social' ? 'Social Media' :
             config.id === 'employees' ? 'Employees' : config.id
    }));

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="flex flex-col h-screen">
        <PageHeader
          title="Companies"
          subtitle="Manage your companies and business relationships"
          buttonLabel="Add Company"
          selectedCount={0}
          onAddClick={handleAddCompany}
        />

        <div className="flex-1 flex flex-col px-6 pb-6">
          <TableToolbar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search companies..."
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            hiddenColumns={hiddenColumns}
            onShowColumn={handleShowColumn}
            onHideColumn={handleHideColumn}
            availableColumns={availableColumns}
          />

          <div className="flex-1 flex flex-col">
            <TableContainer>
              <DataTable
                columns={companyColumns}
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                showPagination={true}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Companies;
