import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import { formatDistanceToNow } from "date-fns";
import { Deal } from "@/types/deals";

interface DealCardProps {
  deal: Deal;
  index: number;
  columnId: string;
}

const DealCard = ({ deal, index, columnId }: DealCardProps) => {
  const showMeetingBadge = ["meet", "negotiation", "closed"].includes(columnId);

  return (
    <Draggable key={deal.id} draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 cursor-move bg-white transition-all duration-300 animate-enter ${
            snapshot.isDragging ? "shadow-lg scale-105" : "hover:shadow-md"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-sm">{deal.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{deal.company}</p>
              <p className="text-sm font-semibold text-primary mt-2">
                {deal.value}
              </p>
            </div>
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src={deal.assignee.avatar} alt={deal.assignee.name} />
              <AvatarFallback>{deal.assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(deal.stageEnteredAt, { addSuffix: true })}
            </p>
            {showMeetingBadge && deal.scheduledMeeting && (
              <Badge 
                variant="secondary" 
                className="bg-[#333333] text-white hover:bg-[#333333]"
              >
                📅 {deal.scheduledMeeting.date} at {deal.scheduledMeeting.time}
              </Badge>
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default DealCard;