import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Event } from "@/entities/Event";
import { EventList } from "./EventList";

interface CalendarTabsProps {
  events: Event[];
  previousEvents: Event[];
}

export const CalendarTabs = ({ events, previousEvents }: CalendarTabsProps) => {
  return (
    <Tabs defaultValue="proximos" className="w-full">
      <TabsList className="bg-gray-100 p-1">
        <TabsTrigger value="proximos" className="px-4">Próximos</TabsTrigger>
        <TabsTrigger value="nao-confirmado" className="px-4">Não confirmado</TabsTrigger>
        <TabsTrigger value="recorrente" className="px-4">Recorrente</TabsTrigger>
        <TabsTrigger value="anteriores" className="px-4">Anteriores</TabsTrigger>
        <TabsTrigger value="cancelado" className="px-4">Cancelado</TabsTrigger>
      </TabsList>

      <TabsContent value="proximos" className="space-y-3">
        <EventList events={events} />
      </TabsContent>

      <TabsContent value="anteriores" className="space-y-3">
        <EventList events={previousEvents} />
      </TabsContent>
    </Tabs>
  );
};