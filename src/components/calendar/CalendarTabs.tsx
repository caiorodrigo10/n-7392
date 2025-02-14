
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
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="upcoming" className="px-4">Upcoming</TabsTrigger>
          <TabsTrigger value="unconfirmed" className="px-4">Unconfirmed</TabsTrigger>
          <TabsTrigger value="recurring" className="px-4">Recurring</TabsTrigger>
          <TabsTrigger value="previous" className="px-4">Previous</TabsTrigger>
          <TabsTrigger value="canceled" className="px-4">Canceled</TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="sm" className="text-sm font-normal">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <TabsContent value="upcoming" className="space-y-3">
        <EventList events={events} />
      </TabsContent>

      <TabsContent value="previous" className="space-y-3">
        <EventList events={previousEvents} isPreviousEvents={true} />
      </TabsContent>
    </Tabs>
  );
};
