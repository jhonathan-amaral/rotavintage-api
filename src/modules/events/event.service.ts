import { ValidationError } from "../../shared/errors/app-erros";
import type { EventRepository } from "./event.repository";
import type {  IEvent } from "./types";

export class EventService {
    constructor(private eventRepository: EventRepository){}

    async createEvent(eventData: IEvent): Promise<IEvent> {
        const eventExists = await this.eventRepository.getEventById(eventData.id!);
        if(eventExists){
            throw new ValidationError("Evento já existe");
        }
        return await this.eventRepository.createEvent(eventData);
    }

    async getAllEvents(): Promise<IEvent[]> {
        const events = await this.eventRepository.getAllEvents();
        if(events.length === 0){
            throw new ValidationError("Nenhum evento encontrado");
        }
        return events;
    }

    async getEventById(id: string): Promise<IEvent> {
        const event = await this.eventRepository.getEventById(id);
        if(!event){
            throw new ValidationError("Evento não encontrado");
        }
        return event;
    }

    async getEventSlug(slug: string): Promise<IEvent> {
        const event = await this.eventRepository.getEventSlug(slug);
        if(!event){
            throw new ValidationError("Evento não encontrado");
        }
        return event;
    }
} 