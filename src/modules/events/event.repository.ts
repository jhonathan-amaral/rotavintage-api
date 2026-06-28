import type {  IEvent } from "./types";

export class EventRepository {
    private eventsBank: IEvent[] = [];
    
    async getEventById(id: string): Promise<IEvent | undefined> {
        return this.eventsBank.find(event => event.id === id);
    }

    async createEvent(eventData: IEvent): Promise<IEvent> {
        const newEvent: IEvent = {
            id: (Math.random() * 1000000).toString(), // Generate a random ID for simplicity
            ...eventData
        };
        this.eventsBank.push(newEvent);
        return newEvent;
    }
}