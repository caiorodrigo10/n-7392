import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface DealStatusDropZoneProps {
  isDropDisabled: boolean;
}

const DealStatusDropZone = ({ isDropDisabled }: DealStatusDropZoneProps) => {
  const statuses = [
    { id: "won", label: "Won", color: "bg-green-500/10 hover:bg-green-500/20" },
    { id: "lost", label: "Lost", color: "bg-red-500/10 hover:bg-red-500/20" },
    { id: "abandoned", label: "Abandoned", color: "bg-gray-500/10 hover:bg-gray-500/20" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-4 p-6 bg-gradient-to-t from-background to-transparent">
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
                "w-full max-w-[300px] h-32 rounded-lg border-2 border-dashed transition-colors",
                status.color,
                snapshot.isDraggingOver && "scale-105",
                isDropDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-xl font-semibold">{status.label}</span>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default DealStatusDropZone;