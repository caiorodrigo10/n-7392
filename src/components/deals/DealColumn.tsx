import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";
import { Trophy, ChevronRight } from "lucide-react";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
  visibleStatuses?: string[];
  onToggleStatus?: (status: string) => void;
  showDateFilter?: boolean;
}

const getColumnBackground = (id: string) => {
  const backgrounds = {
    lead: "bg-[#ECEEF5]",
    qualification: "bg-transparent",
    meet: "bg-[#ECEEF5]",
    negotiation: "bg-transparent",
    closed: "bg-[#ECEEF5]",
    won: "bg-white",
    lost: "bg-white",
    abandoned: "bg-white",
    extended: "bg-white"
  };
  return backgrounds[id as keyof typeof backgrounds] || "bg-[#ECEEF5]";
};

const getStatusColor = (status: string) => {
  const colors = {
    won: "text-[#22C55E]",
    lost: "text-[#EF4444]",
    abandoned: "text-[#6B7280]",
    extended: "text-[#60A5FA]"
  };
  return colors[status as keyof typeof colors] || "text-[#22C55E]";
};

const DealColumn = ({ id, title, deals, total, visibleStatuses = [], onToggleStatus, showDateFilter }: DealColumnProps) => {
  const isStatusColumn = ["won", "lost", "abandoned", "extended"].includes(id);
  const statusColor = getStatusColor(id);
  const isCollapsed = visibleStatuses.length === 0;
  
  // Se for uma coluna de status e estiver colapsada, mostra apenas o botão de expandir
  if (isStatusColumn && isCollapsed) {
    return (
      <div className="w-[80px] shrink-0 h-full transition-all duration-300">
        <div className="bg-white rounded-lg w-full h-full">
          <div className="flex flex-col h-full items-center justify-between py-8 px-2">
            <span className="-rotate-90 whitespace-nowrap text-sm font-light text-secondary/80">
              Finalizadas em
            </span>
            <button 
              onClick={() => onToggleStatus?.('won')}
              className="text-secondary/60 hover:text-secondary/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Se for uma coluna de status e o status não estiver visível, não renderiza
  if (isStatusColumn && !visibleStatuses.includes(id)) {
    return null;
  }
  
  return (
    <div className={`${isStatusColumn ? 'w-[280px]' : 'w-[250px]'} shrink-0 h-full transition-all duration-300`}>
      <div className={`${isStatusColumn ? 'bg-white rounded-lg' : ''} w-full h-full`}>
        {!isStatusColumn && (
          <h2 className="font-medium text-sm mb-4 mt-6 flex items-center gap-1 text-secondary/80">
            {title} <span className="text-secondary/60">({deals.length})</span> - <span className="text-secondary/60">{total}</span>
          </h2>
        )}
        
        <Droppable droppableId={id} type="DEAL">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`h-[calc(100vh-13rem)] ${
                getColumnBackground(id)
              } ${
                snapshot.isDraggingOver ? "bg-opacity-80" : ""
              }`}
            >
              {isStatusColumn && !isCollapsed && (
                <div className="flex items-center justify-between mb-2 px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className={`rounded border-gray-300 ${statusColor} focus:ring-${statusColor}`}
                      checked={visibleStatuses.includes(id)}
                      readOnly 
                    />
                    <span className="text-sm text-secondary/80">{title}</span>
                  </div>
                  <div className="flex items-center justify-between flex-1 px-4">
                    <div className={statusColor}>{total}</div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className={`w-4 h-4 ${statusColor}`} />
                      <span className="text-sm text-secondary/80">{deals.length}</span>
                    </div>
                  </div>
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
                !isCollapsed && !isStatusColumn && <EmptyColumn />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DealColumn;