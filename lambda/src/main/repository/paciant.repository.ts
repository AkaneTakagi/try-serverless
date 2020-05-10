import { Connection } from "mysql2/promise";

export interface PaciantRepository {
    selectPaciants(conn: Connection, registeredBy: string): Promise<Paciant[]>;
    selectPaciant(conn: Connection, id: string): Promise<Paciant>;
    updatePaciant(conn: Connection, paciant: Paciant): Promise<boolean>;
    insertPaciant(conn: Connection, paciant: Paciant): Promise<boolean>;
}

export interface Paciant {
    id: string;
    name: string;
    sex: string;
    age: number;
    testedAt: Date;
    result: string;
    registeredBy;
}