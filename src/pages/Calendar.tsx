import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import { Event } from "@/entities/Event";
import { CalendarTabs } from "@/components/calendar/CalendarTabs";

interface CalendarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
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