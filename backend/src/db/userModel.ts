import { db } from './database.js';

type User = {
  id?: number; 
  login: string;
  email: string;
  password: string;
};

function addUser(user: Omit<User, 'id'>, callback: (err: Error | null, result?: any) => void): void {
  const { login, email, password } = user;
  const stmt = db.prepare(
    'INSERT INTO users (login, email, password) VALUES (?, ?, ?)',
  );
  stmt.run([login, email, password], function (err) {
    callback(err, { id: this.lastID, ...user }); 
  });
  stmt.finalize();
}

function getUserByLogin(
  login: string,
  callback: (err: Error | null, user?: User | null) => void,
): void {
  db.get(
    'SELECT * FROM users WHERE login = ?',
    [login],
    (err, row: { id: number; login: string; email: string; password: string } | undefined) => {
      if (err || !row) {
        callback(err, null);
      } else {
        const user: User = {
          id: row.id,
          login: row.login,
          email: row.email,
          password: row.password,
        };
        callback(null, user);
      }
    },
  );
}

function updateUsername(
  userId: number,
  newLogin: string,
  callback: (err: Error | null) => void,
): void {
  const query = 'UPDATE users SET login = ? WHERE id = ?';
  db.run(query, [newLogin, userId], (err) => {
    callback(err);
  });
}

export { addUser, getUserByLogin, updateUsername, User };
