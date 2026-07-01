import type { ClubRepository } from "./club.repository";
import type { IClub } from "./club.types";

export class ClubService{
    constructor(private clubRepository: ClubRepository){}

    async createClub(clubData: IClub): Promise<IClub> {
        const clubExists = await this.clubRepository.getClubById(clubData.id);
        if(clubExists){
            throw new Error("Clube já existe");
        }   
        return this.clubRepository.createClub(clubData);
    }

    async getClubById(id: string): Promise<IClub | undefined> {
        const club = await this.clubRepository.getClubById(id);
        if(!club){
            throw new Error("Clube não encontrado");
        }
        return club;
    }

    async getAllClubs(): Promise<IClub[]> {
        const clubs = await this.clubRepository.getAllClubs();
        if(clubs.length === 0){
            throw new Error("Nenhum clube encontrado");
        }
        return clubs;
    }

}