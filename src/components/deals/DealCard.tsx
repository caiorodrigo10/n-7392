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
  const isWonDeal = columnId === "won";
  const isLostDeal = columnId === "lost";
  const isExtendedDeal = columnId === "extended";
  const isAbandonedDeal = columnId === "abandoned";
  const isCompletedDeal = isWonDeal || isLostDeal || isExtendedDeal || isAbandonedDeal;

  const getCardBackground = () => {
    if (isWonDeal) return "bg-[#F0FDF4]";
    if (isLostDeal) return "bg-red-50";
    if (isExtendedDeal) return "bg-blue-50";
    if (isAbandonedDeal) return "bg-gray-50";
    return "bg-white";
  };

  return (
    <Draggable key={deal.id} draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 cursor-move transition-all duration-300 animate-enter mb-2 ${getCardBackground()} 
            ${isCompletedDeal ? 'border-secondary/20' : 'border-transparent'} 
            ${snapshot.isDragging ? "shadow-lg scale-105" : isCompletedDeal ? "hover:shadow-md" : ""}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-normal text-secondary">
                  {deal.title}
                </h3>
                {needsAttention && !isWonDeal && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-secondary/60 mt-0.5">
                {deal.company}
              </p>
              <p className="text-sm mt-2 font-normal text-secondary">
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