import { CarsRepository } from "./cars.repository";
import { CarController } from "./cars.controller";
import { CarService } from "./cars.service";
import { AppError } from "../../shared/errors/app-erros";
import { EventRepository } from "../events/event.repository";
import type { FastifyZodInstance } from "../../shared/types/fastify.zod.instance";
import { CarSchema } from "./car.types";
import { z } from "zod";

export async function carRoutes(app: FastifyZodInstance): Promise<void> {
    const carRepository = new CarsRepository();
    const eventRepository = new EventRepository();
    const carService = new CarService(carRepository, eventRepository);
    const carController = new CarController(carService);

    app.setErrorHandler((error, request, reply) => {
        if (
            error &&
            typeof error === "object" &&
            "hasValidationError" in error &&
            error.hasValidationError
        ) {
            return reply.status(400).send({
                message: "Validation error",
                // Forçamos o typecast aqui apenas para expor a propriedade de validação com segurança
                errors: (error as any).validation,
            });
        }

        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        app.log.error(error);
        return reply.status(500).send({
            statusCode: 500,
            message: "Internal Server Error",
        });
    });
    app.post(
        "/cars",
        {
            schema: {
                body: CarSchema,
            },
        },
        carController.create,
    );
    app.get("/cars", carController.getAll);
    app.patch(
        "/cars/:id",
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
                body: CarSchema.partial(),
            },
        },
        carController.updateCar,
    );
    app.post(
        "/cars/:carId/link-event",
        {
            schema: {
                params: z.object({
                    carId: z.string(),
                }),
                body: z.object({
                    eventId: z.string(),
                }),
            },
        },
        carController.linkedEvent,
    );
}
