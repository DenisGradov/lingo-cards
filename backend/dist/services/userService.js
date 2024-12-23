export class UserService {
    dbClient;
    constructor(dbClient) {
        this.dbClient = dbClient;
    }
    async getUserByLogin(login) {
        const query = 'SELECT * FROM users WHERE login = ?';
        const users = await this.dbClient.query(query, [login]);
        return users.length > 0 ? users[0] : null;
    }
    async registerUser(user) {
        const query = 'INSERT INTO users (login, email, password) VALUES (?, ?, ?)';
        await this.dbClient.query(query, [user.login, user.email, user.password]);
    }
    async updateUsername(userId, newLogin) {
        const query = 'UPDATE users SET login = ? WHERE id = ?';
        await this.dbClient.query(query, [newLogin, userId]);
    }
}
