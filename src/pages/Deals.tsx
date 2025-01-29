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
    visibleStatuses,
    toggleStatus,
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

  const statusColumns = ["won", "lost", "abandoned", "extended"].filter(
    status => visibleStatuses.includes(status)
  );

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
                <div className="flex gap-2 border border-gray-200 rounded-lg p-2">
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
                {statusColumns.map((status) => (
                  <div key={status} className="flex flex-col">
                    <DealColumn
                      id={status}
                      title={status.charAt(0).toUpperCase() + status.slice(1)}
                      deals={deals[status as keyof typeof deals]}
                      total={formatCurrency(calculateColumnTotal(deals[status as keyof typeof deals]))}
                      visibleStatuses={visibleStatuses}
                      onToggleStatus={toggleStatus}
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