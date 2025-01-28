import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Clock, Send, MapPin, Users, Video } from "lucide-react";
import { Event } from "@/entities/Event";
import { EventAdapter } from "@/adapters/EventAdapter";
import { EventUseCase } from "@/usecases/EventUseCase";
import { useToast } from "@/components/ui/use-toast";

interface EventCardProps {
  event: Event;
  onEventCancelled?: (eventId: string) => void;
}

export const EventCard = ({ event, onEventCancelled }: EventCardProps) => {
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
            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-700 hover:text-gray-900 font-normal"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar este evento
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-gray-700 hover:text-gray-900 font-normal"
                >
                  Editar
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleReschedule}>
                  <Clock className="h-4 w-4 mr-2" />
                  Reagendar reserva
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="h-4 w-4 mr-2" />
                  Solicitar reagendamento
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPin className="h-4 w-4 mr-2" />
                  Editar Localização
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  + Participantes Adicionais
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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