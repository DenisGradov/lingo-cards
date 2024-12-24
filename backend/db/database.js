import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();

const dbFile = path.resolve(__dirname, 'users.db');
const db = new sqlite.Database(dbFile, (err) => {
  if (err) {
    console.error('Could not connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

export function getWordsByUserId(userId) {
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

export function getPlaylistsByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM playlists WHERE user_id = ?',
      [userId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
}

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          login TEXT UNIQUE,
          email TEXT UNIQUE,
          password TEXT
        )`,
        (err) => {
          if (err) return reject(`Error creating users table: ${err.message}`);
        }
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS words (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          word TEXT,
          translation TEXT,
          next_review_time INTEGER,
          user_id INTEGER,
          playlist_id INTEGER DEFAULT 0,
          review_stage INTEGER DEFAULT 0,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        (err) => {
          if (err) return reject(`Error creating words table: ${err.message}`);
        }
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS playlists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          user_id INTEGER,
          language_code TEXT,
          last_open_time INTEGER,
          number_of_cards INTEGER DEFAULT 0,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        (err) => {
          if (err) return reject(`Error creating playlists table: ${err.message}`);
        }
      );

      resolve();
    });
  });
}

export function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(`Error closing database: ${err.message}`);
      else resolve();
    });
  });
}

export { db };
