import { Droppable } from "@hello-pangea/dnd";

interface DealStatusDropZoneProps {
  isVisible: boolean;
}

const DealStatusDropZone = ({ isVisible }: DealStatusDropZoneProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm p-4 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex justify-between gap-4">
        <Droppable droppableId="lost">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-lg font-medium transition-colors ${
                snapshot.isDraggingOver
                  ? "bg-red-100 border-red-500"
                  : "bg-white/80 border-gray-300"
              }`}
            >
              Lost
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="abandoned">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-lg font-medium transition-colors ${
                snapshot.isDraggingOver
                  ? "bg-orange-100 border-orange-500"
                  : "bg-white/80 border-gray-300"
              }`}
            >
              Abandoned
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="won">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-lg font-medium transition-colors ${
                snapshot.isDraggingOver
                  ? "bg-green-100 border-green-500"
                  : "bg-white/80 border-gray-300"
              }`}
            >
              Won
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DealStatusDropZone;