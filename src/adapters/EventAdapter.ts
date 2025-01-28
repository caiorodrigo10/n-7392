import { Event } from "@/entities/Event";
import { IEventUseCase } from "@/usecases/EventUseCase";

export class EventAdapter {
  constructor(private eventUseCase: IEventUseCase) {}

  async fetchUpcomingEvents(): Promise<Event[]> {
    try {
      return await this.eventUseCase.getUpcomingEvents();
    } catch (error) {
      console.error("Erro ao buscar eventos futuros:", error);
      return [];
    }
  }

  async fetchPreviousEvents(): Promise<Event[]> {
    try {
      return await this.eventUseCase.getPreviousEvents();
    } catch (error) {
      console.error("Erro ao buscar eventos anteriores:", error);
      return [];
    }
  }

  async cancelEvent(eventId: string): Promise<boolean> {
    try {
      await this.eventUseCase.cancelEvent(eventId);
      return true;
    } catch (error) {
      console.error("Erro ao cancelar evento:", error);
      return false;
    }
  }

  async rescheduleEvent(eventId: string, newDate: Date): Promise<Event | null> {
    try {
      return await this.eventUseCase.rescheduleEvent(eventId, newDate);
    } catch (error) {
      console.error("Erro ao reagendar evento:", error);
      return null;
    }
  }
}