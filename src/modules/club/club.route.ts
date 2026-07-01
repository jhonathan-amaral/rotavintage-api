import type { FastifyInstance } from "fastify";
import { ClubRepository } from "./club.repository";
import { ClubService } from "./club.service";
import { ClubController } from "./club.controller";
import { ValidationError } from "../../shared/errors/app-erros";
import { CarSchema } from "../cars/car.types";

export function clubRoutes(app: FastifyInstance) : void  {
    const clubRepository = new ClubRepository()
    const clubService = new ClubService(clubRepository);
    const clubController = new ClubController(clubService, clubRepository);

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof ValidationError) {
            return reply.status(error.statusCode).send({message: error.message})
        }

        app.log.error(error);
        return reply.status(500). send({
            statusCode: 500,
            message: "Internal Server Error"
        })

    })
    app.post("/clubs", {
        schema: {
            body: CarSchema
        }
    }, clubController.createClub.bind(clubController));
    app.get("/clubs/:id", {
        schema:{
            params: CarSchema.pick({id:true})
        }
    },clubController.getClubById.bind(clubController));
    app.get("/clubs", clubController.getAllClubs.bind(clubController));
    app.delete("/clubs/:id",{
        schema:{
            params: CarSchema.pick({id:true})
        }
    }, clubController.deleteClub.bind(clubController));
}