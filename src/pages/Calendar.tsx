import { Layout } from "@/components/Layout";
import { Event } from "@/entities/Event";
import { CalendarTabs } from "@/components/calendar/CalendarTabs";
import { EventUseCase } from "@/usecases/EventUseCase";
import { EventAdapter } from "@/adapters/EventAdapter";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PageHeader } from "@/components/shared/PageHeader";

interface CalendarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Calendar = ({ isCollapsed, setIsCollapsed }: CalendarProps) => {
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
      <div className="h-full flex flex-col">
        <PageHeader
          title="Calendar"
          subtitle="Track and manage your appointments"
          buttonLabel="Add Event"
          onAddClick={() => console.log('Add event clicked')}
        />

        <div className="flex-1 flex flex-col px-6">
          <div className="flex-1 overflow-auto">
            <CalendarTabs events={events} previousEvents={previousEvents} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;