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
  
  if (isStatusColumn && !visibleStatuses.includes(id)) {
    return null;
  }
  
  return (
    <div className={`${isStatusColumn ? (isCollapsed ? 'w-[80px]' : 'w-[280px]') : 'w-[250px]'} shrink-0 h-full transition-all duration-300`}>
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
              {isStatusColumn ? (
                <div className={`flex ${isCollapsed ? 'flex-col h-full items-center justify-center gap-8' : 'items-center justify-between mb-2'} px-2 pt-2`}>
                  {isCollapsed ? (
                    <>
                      <div className="flex flex-col items-center gap-4">
                        <span className="-rotate-90 whitespace-nowrap text-sm text-secondary/80">Finalizadas em</span>
                        <span className="text-sm text-blue-500 cursor-pointer">Janeiro</span>
                      </div>
                      <button 
                        onClick={() => onToggleStatus?.('won')}
                        className="text-secondary/60 hover:text-secondary/80 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              ) : null}
              {deals.length > 0 ? (
                deals.map((index, deal) => (
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
    </div>
  );
};

export default DealColumn;