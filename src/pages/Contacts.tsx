
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableContainer } from "@/components/shared/TableContainer";
import { TableToolbar } from "@/components/shared/table/TableToolbar";
import { contactColumns, contactColumnConfigs } from "@/components/shared/table/contactColumns";
import { useContacts } from "@/hooks/useContacts";
import { useTableState } from "@/hooks/useTableState";

interface ContactsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Contacts = ({ isCollapsed, setIsCollapsed }: ContactsProps) => {
  const { contacts, handleAddContact } = useContacts();

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
    data: contacts,
    pageSize: 20,
    searchFields: ['name', 'email', 'location'],
    columnConfigs: contactColumnConfigs,
  });

  const availableColumns = contactColumnConfigs
    .filter(config => config.id !== 'select' && config.id !== 'actions')
    .map(config => ({
      id: config.id,
      label: config.id === 'name' ? 'Full Name' :
             config.id === 'email' ? 'Email Address' :
             config.id === 'location' ? 'Location' :
             config.id === 'status' ? 'Status' :
             config.id === 'balance' ? 'Account Balance' :
             config.id === 'department' ? 'Department' :
             config.id === 'role' ? 'Job Role' :
             config.id === 'joinDate' ? 'Join Date' :
             config.id === 'lastActive' ? 'Last Active' :
             config.id === 'performance' ? 'Performance Rating' : config.id
    }));

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="flex flex-col h-screen">
        <PageHeader
          title="Contacts"
          subtitle="Manage your contacts and leads"
          buttonLabel="Add Contact"
          selectedCount={0}
          onAddClick={handleAddContact}
        />

        <div className="flex-1 flex flex-col px-6 pb-6">
          <TableToolbar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search contacts..."
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
                columns={contactColumns}
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

export default Contacts;
