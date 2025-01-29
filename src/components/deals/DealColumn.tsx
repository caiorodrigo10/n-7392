import { Droppable } from "@hello-pangea/dnd";
import { Deal } from "@/types/deals";
import DealCard from "./DealCard";
import { EmptyColumn } from "./EmptyColumn";
import { Trophy, Columns, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateFilterDialog from "./DateFilterDialog";
import { useState } from "react";

interface DealColumnProps {
  id: string;
  title: string;
  deals: Deal[];
  total: string;
}

const getColumnBackground = (id: string) => {
  const backgrounds = {
    lead: "bg-[#ECEEF5]",
    qualification: "bg-transparent",
    meet: "bg-[#ECEEF5]",
    negotiation: "bg-transparent",
    closed: "bg-[#ECEEF5]",
    won: "bg-white"
  };
  return backgrounds[id as keyof typeof backgrounds] || "bg-[#ECEEF5]";
};

const DealColumn = ({ id, title, deals, total }: DealColumnProps) => {
  const isWonColumn = id === 'won';
  const [selectedFilter, setSelectedFilter] = useState("January");
  
  return (
    <div className={`${isWonColumn ? 'w-[280px]' : 'w-[250px]'} shrink-0 h-full`}>
      <div className={`${isWonColumn ? 'bg-white rounded-lg p-4' : ''} w-full`}>
        {isWonColumn ? (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-sm text-secondary/80">
                Completed in{" "}
                <DateFilterDialog onFilterChange={setSelectedFilter}>
                  <span className="text-blue-500 cursor-pointer">{selectedFilter}</span>
                </DateFilterDialog>
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-secondary/80 hover:bg-transparent px-0 flex items-center gap-1"
            >
              <Columns className="h-4 w-4" />
              <Plus className="h-3 w-3" />
            </Button>
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
              {isWonColumn && (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]" 
                      checked 
                      readOnly 
                    />
                    <span className="text-sm text-secondary/80">Won</span>
                  </div>
                  <div className="flex items-center justify-between flex-1 px-4">
                    <div className="text-[#22C55E] font-medium">{total}</div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[#22C55E]" />
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