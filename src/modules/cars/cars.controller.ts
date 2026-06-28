import type { FastifyReply, FastifyRequest } from "fastify";
import type { CarService } from "./cars.service";
import type { ICar } from "./car.types";
import { ValidationError } from "../../shared/errors/app-erros";

export class CarController {
    constructor(private carService: CarService) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.updateCar = this.updateCar.bind(this);
    }

    async create(req: FastifyRequest, res: FastifyReply) {
        const carData = req.body as ICar;
        if(!carData){
            throw new ValidationError ("Dados do carro não fornecidos");
        }
        const newCar = await this.carService.createCar(carData);
        return res.status(201).send(newCar);

    }
    
    async getAll(req: FastifyRequest, res: FastifyReply){
        const cars = await this.carService.getAllCars();
        return res.status(200).send(cars);
    }



    async updateCar(req: FastifyRequest, res: FastifyReply){
        const {id } = req.params as {id: string} ;

        const carData = req.body as Partial<ICar>;

        if(!carData || Object.keys(carData).length === 0){
            throw new ValidationError("Dados do carro não fornecidos para atualização");
        }
        const updatedCar = await this.carService.updateCar(id, carData);

        return res.status(200).send(updatedCar);
    }

    // No seu cars.controller.ts:

linkedEvent = async (req: FastifyRequest, res: FastifyReply) => {
    const { carId} = req.params as { carId: string };
    const { eventId } = req.body as { eventId: string };

    if (!eventId) {
        throw new ValidationError("O ID do evento (eventId) é obrigatório no corpo da requisição.");
    }

    // Executa o vínculo através do service
    const association = await this.carService.linkedCarToEvent(carId, eventId);

    return res.status(201).send({
        message: "Carro associado ao evento com sucesso!",
        association
    });
}

}   