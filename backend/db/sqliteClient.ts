import { DBClient } from './dbClient';
import sqlite3 from 'sqlite3';

export class SQLiteClient implements DBClient {
  private db: sqlite3.Database | null = null;

  async connect(): Promise<void> {
    this.db = new sqlite3.Database('database.db');
  }

  async query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db?.all(query, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  async disconnect(): Promise<void> {
    this.db?.close();
  }
}
