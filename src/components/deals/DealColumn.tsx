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
    lead: "bg-gradient-to-b from-[#F97316]/20 to-[#F97316]/5",
    qualification: "bg-gradient-to-b from-[#B2FC6C]/20 to-[#B2FC6C]/5",
    meet: "bg-gradient-to-b from-[#0EA5E9]/20 to-[#0EA5E9]/5",
    negotiation: "bg-gradient-to-b from-[#8B5CF6]/20 to-[#8B5CF6]/5",
    closed: "bg-gradient-to-b from-[#D946EF]/20 to-[#D946EF]/5"
  };
  return backgrounds[id as keyof typeof backgrounds] || "bg-gray-100/50";
};

const DealColumn = ({ id, title, deals, total }: DealColumnProps) => {
  return (
    <div className="w-[250px] shrink-0">
      <h2 className="font-medium text-sm mb-2 flex items-center gap-1 text-secondary/80">
        {title} <span className="text-secondary/60">({deals.length})</span> - <span className="text-primary">{total}</span>
      </h2>
      <Droppable droppableId={id} type="DEAL">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[200px] p-2 rounded-lg transition-colors duration-200 ${
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