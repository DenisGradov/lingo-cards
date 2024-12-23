import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();

const dbFile = path.resolve(__dirname, '../database.db');
const db = new sqlite.Database(dbFile, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

export function getWordsByUserId(userId: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM words WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getPlaylistsByUserId(userId: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM playlists WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function initDatabase(): void {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            translation TEXT,
            next_review_time INTEGER,
            user_id INTEGER,  
            playlist_id INTEGER DEFAULT 0,
            review_stage INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            user_id INTEGER,
            language_code TEXT,
            last_open_time INTEGER,
            number_of_cards INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);
  });
}

export { db };
