import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertCircle, Check, ChevronDown, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AttendanceStatusProps {
  isPreviousEvent: boolean;
}

export const AttendanceStatus = ({ isPreviousEvent }: AttendanceStatusProps) => {
  const [attendanceStatus, setAttendanceStatus] = useState<'pending' | 'attended' | 'not-attended'>('pending');
  const { toast } = useToast();

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

  if (!isPreviousEvent) return null;

  return (
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
  );
};