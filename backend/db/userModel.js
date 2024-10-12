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
function updateUsername(userId, newLogin, callback){
    const query = 'UPDATE users SET login = ? WHERE id = ?';
    db.run(query, [newLogin, userId], (err) => {
        callback(err);
    });
};
export { addUser, getUserByLogin, updateUsername };
