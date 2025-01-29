import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";
import { Trophy, Columns, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateFilterDialog from "./DateFilterDialog";
import { StatusSelector } from "./StatusSelector";
import { useState } from "react";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
  visibleStatuses?: string[];
  onToggleStatus?: (status: string) => void;
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

const DealColumn = ({ id, title, deals, total, visibleStatuses, onToggleStatus }: DealColumnProps) => {
  const isStatusColumn = ["won", "lost", "abandoned", "extended"].includes(id);
  const [selectedFilter, setSelectedFilter] = useState("January");
  const statusColor = getStatusColor(id);
  
  return (
    <div className={`${isStatusColumn ? 'w-[280px]' : 'w-[250px]'} shrink-0 h-full`}>
      <div className={`${isStatusColumn ? 'bg-white rounded-lg p-4' : ''} w-full`}>
        {isStatusColumn ? (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-sm text-secondary/80">
                Completed in{" "}
                <DateFilterDialog onFilterChange={setSelectedFilter}>
                  <span className="text-blue-500 cursor-pointer">{selectedFilter}</span>
                </DateFilterDialog>
              </h2>
            </div>
            {id === "won" && (
              <StatusSelector
                visibleStatuses={visibleStatuses || []}
                onToggleStatus={onToggleStatus || (() => {})}
              />
            )}
          </div>
        ) : (
          <h2 className="font-medium text-sm mb-4 mt-6 flex items-center gap-1 text-secondary/80">
            {title} <span className="text-secondary/60">({deals.length})</span> - <span className="text-secondary/60">{total}</span>
          </h2>
        )}
        
        <Droppable droppableId={id} type="DEAL">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`h-[calc(100vh-13rem)] space-y-2 px-2 pt-2 ${
                getColumnBackground(id)
              } ${
                snapshot.isDraggingOver ? "bg-opacity-80" : ""
              }`}
            >
              {isStatusColumn && (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className={`rounded border-gray-300 ${statusColor} focus:ring-${statusColor}`}
                      checked 
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