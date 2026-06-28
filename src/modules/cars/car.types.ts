export interface ICar{
    id?: string;
    make: string;
    model: string;
    year: number;
    place: string;
    owner: string;
    club: string;
    eventId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ICarEventAssociation {
    id: string;
    carId: string;    // ID do carro participante
    eventId: string;  // ID do evento onde ele vai estar
    createdAt: Date;
}
