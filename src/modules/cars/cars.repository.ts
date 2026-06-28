import { ValidationError } from "../../shared/errors/app-erros";
import type { ICar } from "./car.types";

export class CarsRepository {
    private carsBank: ICar[] = [
        {"id":"872014.0789805866","make":"Volkswagen","model":"Gol GTI2","year":1994,"place":"São Paulo - SP","owner":"Carlos Silva","club":"Clube do Quadrado"}
    ];
    
private carEventsBank: { id: string; carId: string; eventId: string }[] = [];

async associateCarToEvent(carId: string, eventId: string) {
    const association = {
        id: (Math.random() * 1000000).toString(),
        carId,
        eventId
    };
    this.carEventsBank.push(association);
    return association;
}


    async getCarById(id: string): Promise<ICar | undefined> {
        return this.carsBank.find(car => car.id === id);
    }

    async createCar(carData: ICar): Promise<ICar> {
        const newCar: ICar = {
            id: (Math.random() * 1000000).toString(), // Generate a random ID for simplicity
            ...carData
        };
        this.carsBank.push(newCar);
        return newCar;
    }

    async getAllCars(): Promise<ICar[]> {
        return this.carsBank;
    }

 async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | undefined> {
    const carIndex = this.carsBank.findIndex(car => car.id === id);
    if(carIndex === -1 ){
        throw new ValidationError("Carro não encontrado");
    } 

    // 1. Filtra para remover quaisquer chaves que tenham valor 'undefined'
    const dadosFiltrados = Object.fromEntries(
        Object.entries(carData).filter(([_, value]) => value !== undefined)
    );

    // 2. Mescla os dados e usa o 'as ICar' no final da atribuição
    const carAtualizado = { 
        ...this.carsBank[carIndex], 
        ...dadosFiltrados, 
        updatedAt: new Date() 
    } as ICar; // <-- O 'as ICar' aqui elimina o erro por completo

    // 3. Salva no banco em memória
    this.carsBank[carIndex] = carAtualizado;
    
    return carAtualizado;
}
    

}