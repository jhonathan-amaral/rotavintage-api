import type { IClub } from "./club.types";

export class ClubRepository {
    private clubModel: IClub[] = [];

    async createClub(club: IClub): Promise<IClub> {
        this.clubModel.push(club);
        return club;
    }
    
    async getClubById(id: string): Promise<IClub | undefined> {
        return this.clubModel.find(club => club.id === id);
    }
 

    async deleteClub(id: string): Promise<boolean> {
        const clubIndex = this.clubModel.findIndex(club => club.id === id);
        if (clubIndex === -1) {
            return false;
        }
        this.clubModel.splice(clubIndex, 1);
        return true;
    }

    async getAllClubs(): Promise<IClub[]> {
        return this.clubModel;
    }

}