import type { FastifyReply, FastifyRequest } from "fastify";
import type { ClubRepository } from "./club.repository";
import type { ClubService } from "./club.service";
import type { IClub } from "./club.types";
import { ValidationError } from "../../shared/errors/app-erros";

export class ClubController {
    constructor(
        private clubService: ClubService,
        private clubRepository: ClubRepository
    ){}

    async createClub(req: FastifyRequest, res: FastifyReply){
        const clubData = req.body as IClub;
        if(!clubData){
            throw new ValidationError("Dados do clube não fornecidos");
        }

        const newClub = await this.clubService.createClub(clubData);
        return res.status(201).send(newClub);
    }

    async getClubById(req: FastifyRequest, res: FastifyReply){
        const { id } = req.params as { id: string };
        const club = await this.clubService.getClubById(id);
        return res.status(200).send(club);
    }

    async getAllClubs(req: FastifyRequest, res: FastifyReply){
        const clubs = await this.clubService.getAllClubs();
        return res.status(200).send(clubs);
    }

    async deleteClub(req: FastifyRequest, res: FastifyReply){
        const { id } = req.params as { id: string };
        const deleted = await this.clubRepository.deleteClub(id);
        if(!deleted){
            throw new ValidationError("Clube não encontrado para exclusão");
        }
        return res.status(200).send({ message: "Clube excluído com sucesso" });
    }
}