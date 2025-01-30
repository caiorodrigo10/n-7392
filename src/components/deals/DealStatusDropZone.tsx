import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Trash2, CalendarPlus } from "lucide-react";

interface DealStatusDropZoneProps {
  isDropDisabled: boolean;
  isCollapsed: boolean;
}

const DealStatusDropZone = ({ isDropDisabled, isCollapsed }: DealStatusDropZoneProps) => {
  const statuses = [
    { 
      id: "won", 
      label: "Won", 
      color: "bg-[#22C55E]", 
      hoverColor: "hover:bg-[#22C55E]/90",
      icon: CheckCircle 
    },
    { 
      id: "lost", 
      label: "Lost", 
      color: "bg-[#EF4444]", 
      hoverColor: "hover:bg-[#EF4444]/90",
      icon: XCircle 
    },
    { 
      id: "abandoned", 
      label: "Abandoned", 
      color: "bg-[#6B7280]", 
      hoverColor: "hover:bg-[#6B7280]/90",
      icon: Trash2 
    },
    { 
      id: "extended", 
      label: "Extended", 
      color: "bg-[#60A5FA]", 
      hoverColor: "hover:bg-[#60A5FA]/90",
      icon: CalendarPlus 
    },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 flex justify-center gap-4 p-6 bg-gradient-to-t from-background to-transparent transition-all duration-300",
      isCollapsed ? "pl-[60px]" : "pl-64"
    )}>
      <div className="flex justify-center gap-4 max-w-7xl mx-auto px-6 w-full">
        {statuses.map((status) => (
          <Droppable
            key={status.id}
            droppableId={`status-${status.id}`}
            isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "w-full max-w-[300px] h-32 rounded-lg border-2 border-dashed transition-all duration-200",
                  status.color,
                  status.hoverColor,
                  "text-white",
                  snapshot.isDraggingOver && "scale-105 border-solid border-white",
                  isDropDisabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-center h-full gap-2">
                  <status.icon className="w-6 h-6" />
                  <span className="text-xl font-semibold">{status.label}</span>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default DealStatusDropZone;