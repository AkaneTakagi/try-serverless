import * as mysql from "mysql2/promise";

export async function get(): Promise<mysql.Connection> {
    const cfg = {
        host: process.env['RDB_HOST'],
        user: process.env['RDB_USER'],
        password: process.env['RDB_PASSWORD'],
        database: process.env['RDB_DATABASE']
    };
    console.log('create connection...', cfg)

    return await mysql.createConnection(cfg);
}

export async function commit(c: mysql.Connection) {
    await c.commit();
}

export async function end(c: mysql.Connection) {
    await c.end();
}