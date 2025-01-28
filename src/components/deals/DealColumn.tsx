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
            className={`space-y-2 min-h-[200px] p-2 rounded-lg ${
              snapshot.isDraggingOver ? "bg-gray-50" : "bg-gray-100/50"
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