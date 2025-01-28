import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, X, Filter as FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  participants: string;
}

const CalendarPage = ({ isCollapsed, setIsCollapsed }: CalendarProps) => {
  const events: Event[] = [
    {
      id: "1",
      date: "qua, 26 mar",
      time: "12:00pm - 1:00pm",
      title: "Fase 2 - 1h - Caio Apfelbaum between Caio Apfelbaum and Caio Apfelbaum",
      participants: "Você e Caio Apfelbaum",
    },
    {
      id: "2",
      date: "qui, 3 abr",
      time: "10:00am - 11:00am",
      title: "Fase 2 - 1h - Caio Apfelbaum between Caio Apfelbaum and Caio Apfelbaum",
      participants: "Você e Caio Apfelbaum",
    },
  ];

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Reservas</h1>
          <p className="text-gray-600 text-sm">
            Veja os eventos futuros e passados reservados através dos links de tipos de eventos.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="proximos" className="w-full">
            <TabsList className="bg-gray-100 p-1">
              <TabsTrigger value="proximos" className="px-4">Próximos</TabsTrigger>
              <TabsTrigger value="nao-confirmado" className="px-4">Não confirmado</TabsTrigger>
              <TabsTrigger value="recorrente" className="px-4">Recorrente</TabsTrigger>
              <TabsTrigger value="anteriores" className="px-4">Anteriores</TabsTrigger>
              <TabsTrigger value="cancelado" className="px-4">Cancelado</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" className="ml-4 text-sm font-normal">
            <FilterIcon className="h-4 w-4 mr-2 rotate-90" />
            Filtros
          </Button>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
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
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 font-normal"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar este evento
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="font-normal">
                        Editar
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar evento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;