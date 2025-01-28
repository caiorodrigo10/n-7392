import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
}

const getColumnBackground = (id: string) => {
  const backgrounds = {
    lead: "bg-[#8E9196]/20",
    qualification: "bg-[#8E9196]/10",
    meet: "bg-[#8E9196]/20",
    negotiation: "bg-[#8E9196]/10",
    closed: "bg-[#8E9196]/20",
    won: "bg-white border border-[#22C55E]/20"
  };
  return backgrounds[id as keyof typeof backgrounds] || "bg-gray-100/50";
};

const DealColumn = ({ id, title, deals, total }: DealColumnProps) => {
  const isWonColumn = id === 'won';
  
  return (
    <div className="w-[250px] shrink-0">
      <h2 className={`font-medium text-sm mb-2 flex items-center gap-1 ${
        isWonColumn ? 'text-[#22C55E]' : 'text-secondary/80'
      }`}>
        {title} <span className={isWonColumn ? 'text-[#22C55E]/60' : 'text-secondary/60'}>({deals.length})</span> - <span className="text-primary">{total}</span>
      </h2>
      <Droppable droppableId={id} type="DEAL">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 ${isWonColumn ? 'min-h-[calc(100vh-13rem)]' : 'min-h-[200px]'} p-2 rounded-lg transition-colors duration-200 ${
              getColumnBackground(id)
            } ${
              snapshot.isDraggingOver ? "bg-opacity-80" : ""
            }`}
          >
            {deals.length > 0 ? (
              deals.map((deal, index) => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  index={index} 
                  columnId={id}
                />
              ))
            ) : (
              <EmptyColumn />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DealColumn;