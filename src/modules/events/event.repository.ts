import type {  IEvent } from "./types";

export class EventRepository {
    private eventsBank: IEvent[] = [{"id":"150342.43589000273","name":"TEste","description":"Novo teste","location":"Cornelio"}];
    
    async getEventById(id: string): Promise<IEvent | undefined> {
        return this.eventsBank.find(event => event.id === id);
    }

    async getEventSlug(slug: string): Promise<IEvent | undefined> {
        return this.eventsBank.find(event => event.slug === slug);
    }

    async createEvent(eventData: IEvent): Promise<IEvent> {
        const newEvent: IEvent = {
            id: (Math.random() * 1000000).toString(), // Generate a random ID for simplicity
            ...eventData
        };
        this.eventsBank.push(newEvent);
        return newEvent;
    
    }
    async getAllEvents(): Promise<IEvent[]> {
        return this.eventsBank;
    }
}

//aparecidogoncalves180@gmail.com