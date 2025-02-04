import React from 'react';
import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";
import { Trophy, ChevronRight } from "lucide-react";
import '@/styles/scrollbar.css';

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
  const isCollapsed = !visibleStatuses.includes(id);
  const columnRef = React.useRef<HTMLDivElement>(null);
  
  const columnClasses = React.useMemo(() => {
    const baseClasses = [
      'relative h-full flex flex-col',
      getColumnBackground(id),
      isCollapsed ? 'w-[50px]' : 'w-[400px]'
    ];

    // Don't add transition only for Won on first load
    const isInitialWon = id === 'won' && visibleStatuses.includes('won') && visibleStatuses.length === 1;
    if (!isInitialWon || isCollapsed) {
      baseClasses.push('transition-[width] duration-300');
    }

    return baseClasses.join(' ');
  }, [id, isCollapsed, visibleStatuses]);

  // Scroll para todas as interações exceto o Won inicial
  React.useEffect(() => {
    const isInitialWon = id === 'won' && visibleStatuses.length === 1;
    if (!isCollapsed && !isInitialWon) {
      requestAnimationFrame(() => {
        columnRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end'
        });
      });
    }
  }, [isCollapsed, id, visibleStatuses]);
  
  if (isStatusColumn && !visibleStatuses.includes(id)) {
    return null;
  }

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
  
  return (
    <div 
      ref={columnRef}
      className={`w-[300px] shrink-0 h-full transition-all duration-300`}
      data-status={id}
    >
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
              className={`h-[calc(100vh-13rem)] custom-scrollbar overflow-y-auto px-4 box-content ${
                getColumnBackground(id)
              } ${
                snapshot.isDraggingOver ? "bg-opacity-80 border-2 border-primary/50 rounded-lg" : ""
              } transition-all duration-200`}
            >
              {isStatusColumn && !isCollapsed && (
                <div className="flex items-center justify-between mb-2 px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className={`rounded border-gray-300 ${statusColor} focus:ring-${statusColor}`}
                      checked={visibleStatuses.includes(id)}
                      onChange={() => onToggleStatus?.(id)}
                      readOnly={false}
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