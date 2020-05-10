import { PaciantUsecase } from "../paciant.usecase";
import { Paciant, PaciantRepository } from "../../repository/paciant.repository";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { REPOSITORY_TYPES } from "../../repository/types";
import * as conn from "../../core/db/connection";

@injectable()
export class PaciantUsecaseImpl implements PaciantUsecase {
    constructor(@inject(REPOSITORY_TYPES.PaciantRepository) private repo: PaciantRepository) {
    }
    async addPaciant(paciant: Paciant) {
        const c = await conn.get();
        await this.repo.insertPaciant(c, paciant);    
        conn.commit(c);
        conn.end(c);
    }

    async listPaciants(registeredBy: string) {
        const c = await conn.get();
        const paciants: Paciant[] = await this.repo.selectPaciants(c,registeredBy);
        conn.end(c);
        return paciants;
    }

    async getPaciant(id: string) {
        const c = await conn.get();
        const paciant: Paciant = await this.repo.selectPaciant(c, id);
        conn.end(c);
        return paciant;
    }

    async modifyPaciant(paciant: Paciant) {
        const c = await conn.get();
        await this.repo.updatePaciant(c, paciant);
        conn.commit(c);
        conn.end(c);
    }

}