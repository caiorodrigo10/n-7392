import { Layout } from "@/components/Layout";
import DealColumn from "@/components/deals/DealColumn";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";
import { useDealsState } from "@/hooks/useDealsState";
import { PageHeader } from "@/components/shared/PageHeader";
import { DragDropContext } from "@hello-pangea/dnd";

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
    { id: "won", title: "Won" },
  ];

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="h-full flex flex-col">
        <PageHeader
          title="Deals Pipeline"
          subtitle="Track and manage your deals"
          buttonLabel="Add Deal"
          onAddClick={handleAddDeal}
        />

        <DragDropContext 
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="flex-1 flex flex-col min-h-[calc(100vh-13rem)]">
            <div className="flex-1 overflow-x-auto scrollbar-thin px-6">
              <div className="inline-flex gap-2 py-4">
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
            {isDragging && <DealStatusDropZone isDropDisabled={!isDragging} isCollapsed={isCollapsed} />}
          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Deals;