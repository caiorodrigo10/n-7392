import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBar } from "@/components/shared/SearchBar";
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
      <div className="p-8">
        <PageHeader
          title="Contacts"
          subtitle="Manage your contacts and leads"
          buttonLabel="Add Contact"
          selectedCount={selectedCount}
          onAddClick={handleAddContact}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search contacts..."
        />

        <DataTable
          columns={contactColumns}
          data={contacts}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </Layout>
  );
};

export default Contacts;