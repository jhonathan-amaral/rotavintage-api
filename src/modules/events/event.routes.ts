import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { EventRepository } from "./event.repository";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { AppError } from "../../shared/errors/app-erros";
import { EventSchema } from "./types";

export async function eventRoutes(app: FastifyInstance) : Promise<void>  {
    const eventRepository = new EventRepository()
    const eventService = new EventService(eventRepository);
    const eventController = new EventController(eventService);

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({message: error.message})
        }

        app.log.error(error);
        return reply.status(500). send({
            statusCode: 500,
            message: "Internal Server Error"
        })

    })

    app.post("/events", {
        schema:{
            body: EventSchema
        }
    }, eventController.create);
    app.get("/events", eventController.getAllEvents.bind(eventController));
    app.get("/events/:id",{
        schema:{
            params: EventSchema.pick({id:true})
        }
    }, eventController.getEventById.bind(eventController));
    app.get("/events/slug/:slug", {
        schema:{
            params: EventSchema.pick({slug:true})
        }
    }, eventController.getEventSlug.bind(eventController));
} 