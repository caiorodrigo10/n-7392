import { Layout } from "@/components/Layout";
import DealColumn from "@/components/deals/DealColumn";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";
import { useDealsState } from "@/hooks/useDealsState";
import { PageHeader } from "@/components/shared/PageHeader";
import { DragDropContext } from "@hello-pangea/dnd";
import DateFilterDialog from "@/components/deals/DateFilterDialog";
import { StatusSelector } from "@/components/deals/StatusSelector";
import { ChevronRight } from "lucide-react";

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

  const handleExpandClick = () => {
    if (visibleStatuses.length === 0) {
      toggleStatus("won");
    }
  };

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="h-full flex flex-col">
        <div className="sticky top-0 z-10 bg-[#F1F3FA]">
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
          <div className="flex-1 flex flex-col min-h-[calc(100vh-13rem)]">
            <div className="flex-1 px-6 overflow-x-auto">
              <div className="flex gap-2 py-4 min-w-max">
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

                <div className="bg-white rounded-lg p-4 flex-shrink-0">
                  {visibleStatuses.length > 0 && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="font-medium text-sm text-secondary/80">
                          Completed in{" "}
                          <DateFilterDialog onFilterChange={() => {}}>
                            <span className="text-blue-500 cursor-pointer">January</span>
                          </DateFilterDialog>
                        </h2>
                      </div>
                      <StatusSelector
                        visibleStatuses={visibleStatuses}
                        onToggleStatus={toggleStatus}
                      />
                    </div>
                  )}
                  {visibleStatuses.length === 0 ? (
                    <div className="w-[60px] h-full transition-all duration-300">
                      <div className="flex flex-col h-full items-center justify-between py-8 px-2">
                        <span className="-rotate-90 whitespace-nowrap text-base font-medium text-secondary/80 tracking-wide transform translate-y-16">
                          Completed in
                        </span>
                        <button 
                          onClick={handleExpandClick}
                          className="text-secondary/60 hover:text-secondary/80 transition-colors mt-auto"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 animate-fade-in">
                      {statusColumns.map((status) => (
                        <DealColumn
                          key={status}
                          id={status}
                          title={status.charAt(0).toUpperCase() + status.slice(1)}
                          deals={deals[status as keyof typeof deals]}
                          total={formatCurrency(calculateColumnTotal(deals[status as keyof typeof deals]))}
                          visibleStatuses={visibleStatuses}
                          onToggleStatus={toggleStatus}
                        />
                      ))}
                    </div>
                  )}
                </div>
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
