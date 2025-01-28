import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Clock, Send, MapPin, Users, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EventActionsProps {
  onCancel: () => void;
  onReschedule: () => void;
}

export const EventActions = ({ onCancel, onReschedule }: EventActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-gray-700 hover:text-gray-900 font-normal"
        onClick={onCancel}
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
          <DropdownMenuItem onClick={onReschedule}>
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
  );
};