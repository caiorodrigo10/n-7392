import { useState } from "react";
import { Plus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBar } from "@/components/shared/SearchBar";
import { contactColumns } from "@/components/shared/table/contactColumns";
import { Contact } from "@/types/shared";
import { RowSelectionState } from "@tanstack/react-table";

interface ContactsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const mockData: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    location: "New York",
    flag: "🇺🇸",
    status: "Active",
    balance: 5000,
    department: "Sales",
    role: "Manager",
    joinDate: "2023-01-15",
    lastActive: "2024-03-15",
    performance: "Excellent"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    location: "London",
    flag: "🇬🇧",
    status: "Active",
    balance: 4500,
    department: "Marketing",
    role: "Director",
    joinDate: "2023-02-01",
    lastActive: "2024-03-14",
    performance: "Good"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    location: "Toronto",
    flag: "🇨🇦",
    status: "Pending",
    balance: 3500,
    department: "Engineering",
    role: "Developer",
    joinDate: "2023-03-10",
    lastActive: "2024-03-10",
    performance: "Average"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@company.com",
    location: "Sydney",
    flag: "🇦🇺",
    status: "Inactive",
    balance: 2000,
    department: "Support",
    role: "Agent",
    joinDate: "2023-04-20",
    lastActive: "2024-02-28",
    performance: "Poor"
  }
];

const Contacts = ({ isCollapsed, setIsCollapsed }: ContactsProps) => {
  const [search, setSearch] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleAddContact = () => {
    // Implementar lógica para adicionar contato
    console.log("Add contact clicked");
  };

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="p-8">
        <PageHeader
          title="Contacts"
          subtitle="Manage your contacts and leads"
          buttonLabel="Add Contact"
          selectedCount={Object.keys(rowSelection).length}
          onAddClick={handleAddContact}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search contacts..."
        />

        <DataTable
          columns={contactColumns}
          data={mockData}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </Layout>
  );
};

export default Contacts;
