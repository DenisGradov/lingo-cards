import { db } from './database.js';

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

export { addUser, getUserByLogin };
