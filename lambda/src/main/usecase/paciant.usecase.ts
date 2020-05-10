import { Paciant } from "../repository/paciant.repository";

export interface PaciantUsecase{
    listPaciants(registeredBy: string): Promise<Paciant[]>;
    getPaciant(id: string): Promise<Paciant>;
    modifyPaciant(paciant: Paciant): void;
    addPaciant(paciant: Paciant): void;
}
