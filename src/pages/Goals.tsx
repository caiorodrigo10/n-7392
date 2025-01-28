import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { useNavigate } from "react-router-dom";

interface GoalsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Goals = ({ isCollapsed, setIsCollapsed }: GoalsProps) => {
  const navigate = useNavigate();

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <PageHeader
        title="Goals Center"
        subtitle="Manage and track your team's goals"
        buttonLabel="Add Goal"
        onAddClick={() => {}}
      />
      
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Funnel Goals Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Funnel Goals</h2>
          <p className="text-neutral-600 mb-6">Control your general sales funnel goals</p>
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => navigate("/funnel-goals-overview")}
          >
            Define
          </Button>
        </div>

        {/* User Goals Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">User Goals</h2>
          <p className="text-neutral-600 mb-6">Each user can have one or more goals</p>
          <div className="flex gap-4">
            <Button 
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Create
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="flex-1"
            >
              View
              <span className="text-xs ml-1 text-neutral-500">0 goals</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Goals;