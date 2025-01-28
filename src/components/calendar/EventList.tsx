import { Event } from "@/entities/Event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
}

export const EventList = ({ events }: EventListProps) => {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};