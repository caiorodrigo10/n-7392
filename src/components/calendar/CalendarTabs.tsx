import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Event } from "@/entities/Event";
import { EventList } from "./EventList";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarTabsProps {
  events: Event[];
  previousEvents: Event[];
}

export const CalendarTabs = ({ events, previousEvents }: CalendarTabsProps) => {
  return (
    <Tabs defaultValue="proximos" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="proximos" className="px-4">Próximos</TabsTrigger>
          <TabsTrigger value="nao-confirmado" className="px-4">Não confirmado</TabsTrigger>
          <TabsTrigger value="recorrente" className="px-4">Recorrente</TabsTrigger>
          <TabsTrigger value="anteriores" className="px-4">Anteriores</TabsTrigger>
          <TabsTrigger value="cancelado" className="px-4">Cancelado</TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="sm" className="text-sm font-normal">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <TabsContent value="proximos" className="space-y-3">
        <EventList events={events} />
      </TabsContent>

      <TabsContent value="anteriores" className="space-y-3">
        <EventList events={previousEvents} isPreviousEvents={true} />
      </TabsContent>
    </Tabs>
  );
};