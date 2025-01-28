import { useState } from "react";
import { Company } from "@/types/shared";
import { RowSelectionState } from "@tanstack/react-table";

export const useCompanies = () => {
  const [search, setSearch] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Mock data - em um cenário real, isso viria de uma API
  const mockData: Company[] = [
    {
      id: "1",
      name: "Tech Corp",
      website: "https://techcorp.com",
      lastActivity: "2024-03-15",
      linkedContacts: 5,
      score: 8,
      linkedin: "https://linkedin.com/company/techcorp",
      instagram: "https://instagram.com/techcorp",
      twitter: "https://twitter.com/techcorp",
      employees: 250
    },
    {
      id: "2",
      name: "Digital Solutions",
      website: "https://digitalsolutions.com",
      lastActivity: "2024-03-14",
      linkedContacts: 3,
      score: 6,
      linkedin: "https://linkedin.com/company/digitalsolutions",
      instagram: "https://instagram.com/digitalsolutions",
      twitter: "https://twitter.com/digitalsolutions",
      employees: 120
    },
    {
      id: "3",
      name: "Innovation Labs",
      website: "https://innovationlabs.com",
      lastActivity: "2024-03-10",
      linkedContacts: 2,
      score: 4,
      linkedin: "https://linkedin.com/company/innovationlabs",
      instagram: "",
      twitter: "https://twitter.com/innovationlabs",
      employees: 75
    }
  ];

  const filteredCompanies = mockData.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.website.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCompany = () => {
    console.log("Add company clicked");
  };

  return {
    companies: filteredCompanies,
    search,
    setSearch,
    rowSelection,
    setRowSelection,
    handleAddCompany,
    selectedCount: Object.keys(rowSelection).length
  };
};