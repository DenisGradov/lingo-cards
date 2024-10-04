const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.resolve(__dirname, 'users.db');
let db;

function initDatabase() {
    db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.error('Could not connect to database', err);
        } else {
            console.log('Connected to SQLite database');
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT
            )`);
        }
    });
}

function addUser(user, callback) {
    const { login, email, password } = user;
    const stmt = db.prepare('INSERT INTO users (login, email, password) VALUES (?, ?, ?)');
    stmt.run([login, email, password], function (err) {
        callback(err, this);
    });
    stmt.finalize();
}

function getUserByLogin(login, callback) {
    db.get('SELECT * FROM users WHERE login = ?', [login], callback);
}

module.exports = { initDatabase, addUser, getUserByLogin };
