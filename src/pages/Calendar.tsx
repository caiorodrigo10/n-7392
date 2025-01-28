import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import { Event } from "@/entities/Event";
import { CalendarTabs } from "@/components/calendar/CalendarTabs";
import { EventUseCase } from "@/usecases/EventUseCase";
import { EventAdapter } from "@/adapters/EventAdapter";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CalendarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const CalendarPage = ({ isCollapsed, setIsCollapsed }: CalendarProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [previousEvents, setPreviousEvents] = useState<Event[]>([]);
  const { toast } = useToast();
  
  const eventAdapter = new EventAdapter(new EventUseCase());

  useEffect(() => {
    const fetchEvents = async () => {
      const upcomingEvents = await eventAdapter.fetchUpcomingEvents();
      const pastEvents = await eventAdapter.fetchPreviousEvents();
      
      setEvents(upcomingEvents);
      setPreviousEvents(pastEvents);
    };

    fetchEvents();
  }, []);

  const handleCancelEvent = async (eventId: string) => {
    const success = await eventAdapter.cancelEvent(eventId);
    
    if (success) {
      toast({
        title: "Evento cancelado",
        description: "O evento foi cancelado com sucesso.",
      });
      
      // Atualizar a lista de eventos
      setEvents(events.filter(event => event.id !== eventId));
    } else {
      toast({
        title: "Erro ao cancelar",
        description: "Não foi possível cancelar o evento.",
        variant: "destructive",
      });
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <Button variant="outline" size="sm" className="text-sm font-normal">
              <FilterIcon className="h-4 w-4 mr-2 rotate-90" />
              Filtros
            </Button>
          </div>

          <CalendarTabs events={events} previousEvents={previousEvents} />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;