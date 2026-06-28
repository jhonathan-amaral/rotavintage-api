import type { FastifyReply, FastifyRequest } from "fastify";
import  { EventService } from "./event.service";
import type { IEvent } from "./types";
import { ValidationError } from "../../shared/errors/app-erros";

export class EventController {
    constructor(private eventService: EventService) {
        this.create = this.create.bind(this);
    }

    async create(req: FastifyRequest, res: FastifyReply) {
        const eventData = req.body as IEvent;
        if(!eventData){
            throw new ValidationError("Dados do evento não fornecidos");
        }
        const newEvent = await this.eventService.createEvent(eventData);
        return res.status(201).send(newEvent);

    }
}