import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Clock, Send, MapPin, Users } from "lucide-react";
import { Event } from "@/entities/Event";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex gap-8">
          <div className="w-40">
            <div className="font-medium text-sm">{event.date}</div>
            <div className="text-gray-600 text-sm">{event.time}</div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1">{event.title}</div>
            <div className="text-gray-600 text-sm">{event.participants}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-700 hover:text-gray-900 font-normal border-gray-200"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar este evento
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 hover:text-gray-900 font-normal border-gray-200"
              >
                Editar
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
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
    </Card>
  );
};