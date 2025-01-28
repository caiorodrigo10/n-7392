import { Event } from "@/entities/Event";

export interface IEventUseCase {
  getUpcomingEvents(): Promise<Event[]>;
  getPreviousEvents(): Promise<Event[]>;
  cancelEvent(eventId: string): Promise<void>;
  rescheduleEvent(eventId: string, newDate: Date): Promise<Event>;
}

export class EventUseCase implements IEventUseCase {
  async getUpcomingEvents(): Promise<Event[]> {
    return [
      {
        id: "1",
        date: "qua, 26 mar",
        time: "12:00pm - 1:00pm",
        title: "Fase 2 - 1h - Caio Apfelbaum between Caio Apfelbaum and Caio Apfelbaum",
        participants: "Você e Caio Apfelbaum",
        meetLink: "https://meet.google.com/abc-defg-hij"
      },
      {
        id: "2",
        date: "qui, 3 abr",
        time: "10:00am - 11:00am",
        title: "Fase 2 - 1h - Caio Apfelbaum between Caio Apfelbaum and Caio Apfelbaum",
        participants: "Você e Caio Apfelbaum",
        meetLink: "https://meet.google.com/abc-defg-hij"
      },
    ];
  }

  async getPreviousEvents(): Promise<Event[]> {
    return [
      {
        id: "3",
        date: "19 novembro 2024",
        time: "10:00am - 10:20am",
        title: "Café com Caio between Caio Apfelbaum and Caio Apfelbaum5",
        participants: "Você e Caio Apfelbaum5",
        meetLink: "https://meet.google.com/abc-defg-hij"
      },
      {
        id: "4",
        date: "19 novembro 2024",
        time: "10:20am - 10:40am",
        title: "Café com Caio between Caio Apfelbaum and Caio Apfelbaum4",
        participants: "Você e Caio Apfelbaum4",
        meetLink: "https://meet.google.com/abc-defg-hij"
      },
    ];
  }

  async cancelEvent(eventId: string): Promise<void> {
    console.log(`Cancelando evento ${eventId}`);
    // Implementar lógica de cancelamento
  }

  async rescheduleEvent(eventId: string, newDate: Date): Promise<Event> {
    console.log(`Reagendando evento ${eventId} para ${newDate}`);
    // Implementar lógica de reagendamento
    return {
      id: eventId,
      date: newDate.toLocaleDateString(),
      time: "12:00pm - 1:00pm",
      title: "Evento Reagendado",
      participants: "Participantes",
    };
  }
}
