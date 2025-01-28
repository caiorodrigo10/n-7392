import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";
import { Event } from "@/entities/Event";
import { EventAdapter } from "@/adapters/EventAdapter";
import { EventUseCase } from "@/usecases/EventUseCase";
import { useToast } from "@/components/ui/use-toast";
import { EventActions } from "./EventActions";
import { AttendanceStatus } from "./AttendanceStatus";

interface EventCardProps {
  event: Event;
  onEventCancelled?: (eventId: string) => void;
  isPreviousEvent?: boolean;
}

export const EventCard = ({ event, onEventCancelled, isPreviousEvent = false }: EventCardProps) => {
  const { toast } = useToast();
  const eventAdapter = new EventAdapter(new EventUseCase());

  const handleCancel = async () => {
    const success = await eventAdapter.cancelEvent(event.id);
    
    if (success) {
      toast({
        title: "Evento cancelado",
        description: "O evento foi cancelado com sucesso.",
      });
      
      if (onEventCancelled) {
        onEventCancelled(event.id);
      }
    } else {
      toast({
        title: "Erro ao cancelar",
        description: "Não foi possível cancelar o evento.",
        variant: "destructive",
      });
    }
  };

  const handleReschedule = async () => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade de reagendamento em desenvolvimento.",
    });
  };

  return (
    <Card className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">{event.date}</div>
            <div className="text-gray-600">{event.time}</div>
          </div>
          <div className="flex items-center gap-2">
            <EventActions 
              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
            <AttendanceStatus isPreviousEvent={isPreviousEvent} />
          </div>
        </div>
        
        <div>
          <div className="font-medium text-gray-900">{event.title}</div>
          <div className="text-gray-600">{event.participants}</div>
        </div>

        {event.meetLink && (
          <a 
            href={event.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 w-fit"
          >
            <Video className="h-4 w-4 mr-2" />
            Junte-se a Google Meet
          </a>
        )}
      </div>
    </Card>
  );
};