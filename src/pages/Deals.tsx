import { DragDropContext } from "@hello-pangea/dnd";
import Navbar from "@/components/Navbar";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";
import DealColumn from "@/components/deals/DealColumn";
import { useDealsState } from "@/hooks/useDealsState";
import { PageHeader } from "@/components/shared/PageHeader";

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
    <div className="min-h-screen bg-white flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-[60px]' : 'ml-64'
        }`}
      >
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
          <div className="w-full overflow-x-auto">
            <div className="flex gap-4 min-w-max p-4">
              {columns.map((column) => (
                <DealColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  deals={deals[column.id as keyof typeof deals]}
                  total={formatCurrency(calculateColumnTotal(deals[column.id as keyof typeof deals]))}
                />
              ))}
            </div>
            {isDragging && <DealStatusDropZone isDropDisabled={!isDragging} isCollapsed={isCollapsed} />}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Deals;