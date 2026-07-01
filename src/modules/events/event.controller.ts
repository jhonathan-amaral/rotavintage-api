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

    async getAllEvents(req: FastifyRequest, res: FastifyReply) {
        const events = await this.eventService.getAllEvents();
        if(!events || events.length === 0){
            throw new ValidationError("Nenhum evento encontrado");
        }
        return res.status(200).send(events);
    }

    async getEventById(req: FastifyRequest, res: FastifyReply) {
        const { id } = req.params as { id: string };
        if(!id){
            throw new ValidationError("ID do evento não fornecido");
        }
        const event = await this.eventService.getEventById(id);
        return res.status(200).send(event);
    }

    async getEventSlug(req: FastifyRequest, res: FastifyReply) {
        const { slug } = req.params as { slug: string };
        if(!slug){
            throw new ValidationError("Slug do evento não fornecido");
        }
        const event = await this.eventService.getEventSlug(slug);
        return res.status(200).send(event);
    }
}