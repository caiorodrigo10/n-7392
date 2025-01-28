import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { Deal } from "@/types/deals";

interface DealCardProps {
  deal: Deal;
  index: number;
  columnId: string;
}

const DealCard = ({ deal, index, columnId }: DealCardProps) => {
  const showMeetingBadge = ["meet", "negotiation", "closed"].includes(columnId);
  const needsAttention = deal.value.replace(/[^0-9]/g, '') > "50000";

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
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-secondary">{deal.title}</h3>
                {needsAttention && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-secondary/60 mt-0.5">{deal.company}</p>
              <p className="text-sm font-semibold text-[#F97316] mt-2">
                {deal.value}
              </p>
            </div>
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src={deal.assignee.avatar} alt={deal.assignee.name} />
              <AvatarFallback>{deal.assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-secondary/60">
              {formatDistanceToNow(deal.stageEnteredAt, { addSuffix: true })}
            </p>
            {showMeetingBadge && deal.scheduledMeeting && (
              <Badge 
                variant="secondary" 
                className="bg-[#333333] text-white hover:bg-[#333333] text-xs px-2 py-0.5"
              >
                📅 {deal.scheduledMeeting.date} {deal.scheduledMeeting.time}
              </Badge>
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default DealCard;