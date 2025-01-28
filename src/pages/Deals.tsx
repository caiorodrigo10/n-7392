import { DragDropContext } from "@hello-pangea/dnd";
import { Layout } from "@/components/Layout";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";
import DealColumn from "@/components/deals/DealColumn";
import { useDealsState } from "@/hooks/useDealsState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DealsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Deals = ({ isCollapsed, setIsCollapsed }: DealsProps) => {
  const {
    deals,
    isDragging,
    calculateColumnTotal,
    formatCurrency,
    onDragStart,
    onDragEnd,
    handleAddDeal
  } = useDealsState();

  const columns = [
    { id: "lead", title: "Lead" },
    { id: "qualification", title: "Qualification" },
    { id: "meet", title: "Meet" },
    { id: "negotiation", title: "Negotiation" },
    { id: "closed", title: "Closing" },
  ];

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <PageHeader
          title="Deals Pipeline"
          subtitle="Track and manage your deals"
          buttonLabel="Add Deal"
          onAddClick={handleAddDeal}
        />
      </div>

      <DragDropContext 
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-col h-[calc(100vh-13rem)]">
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-x-auto scrollbar-thin">
              <div className="flex gap-4 min-w-max p-4">
                {columns.map((column) => (
                  <div key={column.id} className="flex flex-col">
                    <DealColumn
                      id={column.id}
                      title={column.title}
                      deals={deals[column.id as keyof typeof deals]}
                      total={formatCurrency(calculateColumnTotal(deals[column.id as keyof typeof deals]))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 min-w-max p-4 border-t">
            {columns.map((column) => (
              <div key={column.id} className="w-[280px]">
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 h-8"
                  onClick={() => console.log(`Add calculation for ${column.id}`)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add calculation</span>
                </Button>
              </div>
            ))}
          </div>
          {isDragging && <DealStatusDropZone isDropDisabled={!isDragging} isCollapsed={isCollapsed} />}
        </div>
      </DragDropContext>
    </Layout>
  );
};

export default Deals;