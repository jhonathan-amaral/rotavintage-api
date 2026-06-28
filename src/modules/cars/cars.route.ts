import type { FastifyInstance } from "fastify";
import { CarsRepository } from "./cars.repository";
import { CarController } from "./cars.controller";
import { CarService } from "./cars.service";
import { AppError } from "../../shared/errors/app-erros";
import { EventRepository } from "../events/event.repository";

export async function carRoutes(app: FastifyInstance) : Promise<void>  {
    const carRepository = new CarsRepository()
    const eventRepository = new EventRepository()
    const carService = new CarService(carRepository, eventRepository);
    const carController = new CarController(carService);

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
    app.post("/cars", carController.create);
    app.get("/cars", carController.getAll);
    app.patch("/cars/:id", carController.updateCar);
    app.post("/cars/:carId/link-event", carController.linkedEvent);
}