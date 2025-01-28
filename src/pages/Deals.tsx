import { DragDropContext } from "@hello-pangea/dnd";
import Navbar from "@/components/Navbar";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";
import DealColumn from "@/components/deals/DealColumn";
import { useDealsState } from "@/hooks/useDealsState";

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
    onDragEnd
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
      <main 
        className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
          isCollapsed ? 'ml-[60px]' : 'ml-64'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Deals Pipeline</h1>
          <p className="text-gray-600 mt-1 text-sm">Track and manage your deals</p>
        </div>

        <DragDropContext 
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
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
          </div>
          {isDragging && <DealStatusDropZone isDropDisabled={!isDragging} isCollapsed={isCollapsed} />}
        </DragDropContext>
      </main>
    </div>
  );
};

export default Deals;