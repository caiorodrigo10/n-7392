import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
}

const DealColumn = ({ id, title, deals, total }: DealColumnProps) => {
  return (
    <div className="w-[280px]">
      <h2 className="font-medium text-sm mb-3">
        {title} ({deals.length}) - {total}
      </h2>
      <Droppable droppableId={id} type="DEAL">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[200px] p-3 rounded-lg ${
              snapshot.isDraggingOver ? "bg-gray-50" : "bg-gray-100/50"
            }`}
          >
            {deals.map((deal, index) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                index={index} 
                columnId={id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DealColumn;