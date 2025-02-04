import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBar } from "@/components/shared/SearchBar";
import { TableContainer } from "@/components/shared/TableContainer";
import { contactColumns } from "@/components/shared/table/contactColumns";
import { useContacts } from "@/hooks/useContacts";

interface ContactsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Contacts = ({ isCollapsed, setIsCollapsed }: ContactsProps) => {
  const {
    contacts,
    search,
    setSearch,
    rowSelection,
    setRowSelection,
    handleAddContact,
    selectedCount
  } = useContacts();

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="flex flex-col h-screen">
        <PageHeader
          title="Contacts"
          subtitle="Manage your contacts and leads"
          buttonLabel="Add Contact"
          selectedCount={selectedCount}
          onAddClick={handleAddContact}
        />

        <div className="flex-1 flex flex-col px-6 pb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search contacts..."
          />

          <div className="flex-1 flex flex-col mt-4">
            <TableContainer>
              <DataTable
                columns={contactColumns}
                data={contacts}
                onRowSelectionChange={setRowSelection}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;