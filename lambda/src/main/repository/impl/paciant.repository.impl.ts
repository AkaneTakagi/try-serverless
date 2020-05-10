
import { PaciantRepository, Paciant } from "../paciant.repository";
import * as mysql from "mysql2/promise";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class PaciantRepositoryImpl implements PaciantRepository {

    async insertPaciant(conn: mysql.Connection, paciant: Paciant) {
        console.log('start: insertPaciant');
        await conn.query("insert into `paciant` "
            + "(`name`, `sex`, `age`, `tested_at`, `result`, `registered_by`) "
            + "values (?, ?, ?, ?, ?, ?)", 
            [paciant.name, paciant.sex, paciant.age, paciant.testedAt, paciant.result, paciant.registeredBy]);
        return true;
    }

    async selectPaciants(conn: mysql.Connection, registeredBy: string) {
        console.log('start: PaciantRepository.selectPaciants');
        const rows: any[] = await conn.query("select * from `paciant` where `registered_by` = ?", [registeredBy]);
        const paciants = rows[0].map(r => this.mapToPaciant(r));
        return paciants;
    }

    async selectPaciant(conn: mysql.Connection, id: string) {
        console.log('start: PaciantRepository.selectPaciant');
        const rows: any[] = await conn.query("select * from `paciant` where `id` = ?", [id]);
        const paciants: Paciant[] = rows[0].map(r => this.mapToPaciant(r));
        return paciants.length ? paciants[0] : null;
    }

    async updatePaciant(conn: mysql.Connection, paciant: Paciant) {
        console.log('start: insertPaciant');
        await conn.query("update `paciant` set "
            + "`name` = ?, `sex` = ?, `age` = ?, `tested_at` = ?, `result` = ?, `registered_by` = ? "
            + "where `id` = ?", 
            [paciant.name, paciant.sex, paciant.age, paciant.testedAt, paciant.result, paciant.registeredBy, paciant.id]);
        return true;
    }

    private mapToPaciant(row: any): Paciant {
        return {
            id: row.id.toString(),
            name: row.name,
            age: row.age,
            sex: row.sex,
            testedAt: new Date(row.tested_at),
            result: row.result,
            registeredBy: row.registered_by
        }
    }

}