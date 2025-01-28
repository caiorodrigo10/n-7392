import { Event } from "@/entities/Event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  isPreviousEvents?: boolean;
}

export const EventList = ({ events, isPreviousEvents = false }: EventListProps) => {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          isPreviousEvent={isPreviousEvents}
        />
      ))}
    </div>
  );
};