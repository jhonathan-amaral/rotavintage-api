import type { ICar } from "./car.types";

export class CarsRepository {
    private carsBank: ICar[] = [];
    
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
    

}