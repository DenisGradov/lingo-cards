import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES6 модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();

const dbFile = path.resolve(__dirname, 'users.db');
const db = new sqlite.Database(dbFile, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase(); // Важно, чтобы эта функция вызвалась при подключении
    }
});

// Получение слов по user_id
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

// Получение плейлистов по user_id
export function getPlaylistsByUserId(userId) {
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


export function initDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )`);

        // Words table
        db.run(`CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            translation TEXT,
            next_review_time INTEGER,
            user_id INTEGER,  
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        // Playlists table
        db.run(`CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        // PlaylistWords table (Many-to-Many relationship)
        db.run(`CREATE TABLE IF NOT EXISTS playlist_words (
            playlist_id INTEGER,
            word_id INTEGER,
            FOREIGN KEY (playlist_id) REFERENCES playlists(id),
            FOREIGN KEY (word_id) REFERENCES words(id),
            PRIMARY KEY (playlist_id, word_id)
        )`);
    });
}

export { db };
