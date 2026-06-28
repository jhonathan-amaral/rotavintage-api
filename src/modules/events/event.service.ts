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
}