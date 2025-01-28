import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";
import { Trophy } from "lucide-react";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
}

const getColumnBackground = (id: string) => {
  const backgrounds = {
    lead: "bg-[#F1F1F1]/60",
    qualification: "bg-[#8E9196]/0",
    meet: "bg-[#F1F1F1]/60",
    negotiation: "bg-[#8E9196]/0",
    closed: "bg-[#F1F1F1]/60",
    won: "bg-white border border-[#22C55E]/20"
  };
  return backgrounds[id as keyof typeof backgrounds] || "bg-gray-100";
};

const DealColumn = ({ id, title, deals, total }: DealColumnProps) => {
  const isWonColumn = id === 'won';
  
  return (
    <div className="w-[280px] shrink-0 h-full">
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
            className={`h-[calc(100vh-13rem)] space-y-2 p-2 rounded-lg transition-colors duration-200 ${
              getColumnBackground(id)
            } ${
              snapshot.isDraggingOver ? "bg-opacity-80" : ""
            }`}
          >
            {isWonColumn && (
              <div className="bg-white rounded-lg p-4 mb-2 border border-[#22C55E]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Ganha</span>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-sm">{deals.length}</span>
                  </div>
                </div>
                <div className="text-[#22C55E] font-medium">{total}</div>
              </div>
            )}
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