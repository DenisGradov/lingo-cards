import { DBClient } from '../db/dbClient';

export interface User {
    id?: number;
    login: string;
    password: string;
    email: string; 
  }
  

export class UserService {
  private dbClient: DBClient;

  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }

  async getUserByLogin(login: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE login = ?';
    const users: User[] = await this.dbClient.query(query, [login]);
    return users.length > 0 ? users[0] : null;
  }

  async registerUser(user: User): Promise<void> {
    const query = 'INSERT INTO users (login, email, password) VALUES (?, ?, ?)';
    await this.dbClient.query(query, [user.login, user.email, user.password]);
  }  

  async updateUsername(userId: number, newLogin: string): Promise<void> {
    const query = 'UPDATE users SET login = ? WHERE id = ?';
    await this.dbClient.query(query, [newLogin, userId]);
  }
}
