import sqlite3 from 'sqlite3';
export class SQLiteClient {
    db = null;
    async connect() {
        this.db = new sqlite3.Database('database.db');
    }
    async query(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db?.all(query, params, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    async disconnect() {
        this.db?.close();
    }
}
