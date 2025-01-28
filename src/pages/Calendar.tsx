import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, X, Filter as FilterIcon, Clock, Send, MapPin, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

  const previousEvents: Event[] = [
    {
      id: "3",
      date: "19 novembro 2024",
      time: "10:00am - 10:20am",
      title: "Café com Caio between Caio Apfelbaum and Caio Apfelbaum5",
      participants: "Você e Caio Apfelbaum5",
    },
    {
      id: "4",
      date: "19 novembro 2024",
      time: "10:20am - 10:40am",
      title: "Café com Caio between Caio Apfelbaum and Caio Apfelbaum4",
      participants: "Você e Caio Apfelbaum4",
    },
    {
      id: "5",
      date: "19 novembro 2024",
      time: "10:40am - 11:00am",
      title: "Café com Caio between Caio Apfelbaum and Caio Apfelbaum6",
      participants: "Você e Caio Apfelbaum6",
    },
    {
      id: "6",
      date: "20 novembro 2024",
      time: "8:00am - 8:30am",
      title: "Lovable x Caio | Lovable for Business",
      participants: "Sebastian Schaaf, Caio Rodrifo e piffer182@gmail.com",
    },
  ];

  const renderEventCard = (event: Event) => (
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

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Reservas</h1>
          <p className="text-gray-600 text-sm">
            Veja os eventos futuros e passados reservados através dos links de tipos de eventos.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="text-sm font-normal">
              <FilterIcon className="h-4 w-4 mr-2 rotate-90" />
              Filtros
            </Button>
          </div>

          <Tabs defaultValue="proximos" className="w-full">
            <TabsList className="bg-gray-100 p-1">
              <TabsTrigger value="proximos" className="px-4">Próximos</TabsTrigger>
              <TabsTrigger value="nao-confirmado" className="px-4">Não confirmado</TabsTrigger>
              <TabsTrigger value="recorrente" className="px-4">Recorrente</TabsTrigger>
              <TabsTrigger value="anteriores" className="px-4">Anteriores</TabsTrigger>
              <TabsTrigger value="cancelado" className="px-4">Cancelado</TabsTrigger>
            </TabsList>

            <TabsContent value="proximos" className="space-y-3">
              {events.map(renderEventCard)}
            </TabsContent>

            <TabsContent value="anteriores" className="space-y-3">
              {previousEvents.map(renderEventCard)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;