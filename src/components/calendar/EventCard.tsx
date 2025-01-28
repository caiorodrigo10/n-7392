import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Clock, Send, MapPin, Users, Video, AlertCircle, Check } from "lucide-react";
import { Event } from "@/entities/Event";
import { EventAdapter } from "@/adapters/EventAdapter";
import { EventUseCase } from "@/usecases/EventUseCase";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  onEventCancelled?: (eventId: string) => void;
  isPreviousEvent?: boolean;
}

export const EventCard = ({ event, onEventCancelled, isPreviousEvent = false }: EventCardProps) => {
  const { toast } = useToast();
  const eventAdapter = new EventAdapter(new EventUseCase());
  const [attendanceStatus, setAttendanceStatus] = useState<'pending' | 'attended' | 'not-attended'>('pending');

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

  const handleAttendanceStatus = (status: 'attended' | 'not-attended') => {
    setAttendanceStatus(status);
    toast({
      title: status === 'attended' ? "Marcado como comparecido" : "Marcado como não comparecido",
      description: "Status atualizado com sucesso.",
    });
  };

  const getStatusButton = () => {
    switch (attendanceStatus) {
      case 'attended':
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-green-100 border-green-200 text-green-700 hover:bg-green-200 hover:text-green-800 font-normal"
          >
            <Check className="h-4 w-4 mr-2 text-green-600" />
            Comparecido
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        );
      case 'not-attended':
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-red-100 border-red-200 text-red-700 hover:bg-red-200 hover:text-red-800 font-normal"
          >
            <X className="h-4 w-4 mr-2 text-red-600" />
            Não comparecido
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        );
      default:
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-yellow-100 border-yellow-200 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800 font-normal"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Status pendente
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        );
    }
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

            {isPreviousEvent && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {getStatusButton()}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => handleAttendanceStatus('attended')} className="text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    Comparecido
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAttendanceStatus('not-attended')} className="text-red-600">
                    <X className="h-4 w-4 mr-2" />
                    Não comparecido
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

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