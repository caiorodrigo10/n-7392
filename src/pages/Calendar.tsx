import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, MoreVertical } from "lucide-react";
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Reservas</h1>
          <p className="text-gray-600">
            Veja os eventos futuros e passados reservados através dos links de tipos de eventos.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="proximos" className="w-full">
            <TabsList>
              <TabsTrigger value="proximos">Próximos</TabsTrigger>
              <TabsTrigger value="nao-confirmado">Não confirmado</TabsTrigger>
              <TabsTrigger value="recorrente">Recorrente</TabsTrigger>
              <TabsTrigger value="anteriores">Anteriores</TabsTrigger>
              <TabsTrigger value="cancelado">Cancelado</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="ml-4">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-6">
                  <div className="w-48">
                    <div className="font-medium">{event.date}</div>
                    <div className="text-gray-600">{event.time}</div>
                  </div>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-gray-600">{event.participants}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="text-gray-600">
                    Cancelar este evento
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
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