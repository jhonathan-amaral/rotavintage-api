import { ValidationError } from "../../shared/errors/app-erros";
import type { EventRepository } from "../events/event.repository";
import type { ICar } from "./car.types";
import type { CarsRepository } from "./cars.repository";

export class CarService {
    constructor(
        private carRepository: CarsRepository,
        private eventRepository: EventRepository
    
    ){}

    async createCar(carData: ICar): Promise<ICar> {
        const carExists = await this.carRepository.getCarById(carData.id!);
        if(carExists){
            throw new ValidationError("Carro já existe");
        }
        return await this.carRepository.createCar(carData);
    }

  async getAllCars(): Promise<ICar[]> {
    const cars = await this.carRepository.getAllCars();
    
    if (cars.length === 0) {
        throw new ValidationError("Nenhum carro encontrado");
    }
    
    return cars;
}


    async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | undefined> {
        const carExists = await this.carRepository.getCarById(id);
        if(!carExists) {
            throw new ValidationError("Carro não encontrado");
        }
        return await this.carRepository.updateCar(id, carData);

    }

    async linkedCarToEvent(carId: string, eventId: string): Promise<ICar> {
        const carExists = await this.carRepository.getCarById(carId);
        if(!carExists) {
            throw new ValidationError("Carro não encontrado");
        }

        const eventExists = await this.eventRepository.getEventById(eventId);
        if(!eventExists){
            throw new ValidationError("Evento não encontrado");
        }
        const association = await this.carRepository.associateCarToEvent(carId, eventId);
        return {
            ...carExists,
            eventId: association.eventId
        };
    }

    
}