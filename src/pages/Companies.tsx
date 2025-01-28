import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBar } from "@/components/shared/SearchBar";
import { companyColumns } from "@/components/shared/table/companyColumns";
import { useCompanies } from "@/hooks/useCompanies";

interface CompaniesProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Companies = ({ isCollapsed, setIsCollapsed }: CompaniesProps) => {
  const {
    companies,
    search,
    setSearch,
    rowSelection,
    setRowSelection,
    handleAddCompany,
    selectedCount
  } = useCompanies();

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="h-screen flex flex-col">
        <PageHeader
          title="Companies"
          subtitle="Manage your companies and business relationships"
          buttonLabel="Add Company"
          selectedCount={selectedCount}
          onAddClick={handleAddCompany}
        />

        <div className="flex-1 flex flex-col px-6 pb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search companies..."
          />

          <div className="flex-1 flex flex-col mt-4">
            <DataTable
              columns={companyColumns}
              data={companies}
              onRowSelectionChange={setRowSelection}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Companies;