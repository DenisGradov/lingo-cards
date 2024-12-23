import { parseBody } from '../utils/parseBody.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { parseCookies } from '../utils/main.js';
import { UserService } from '../services/userService.js';
import { SQLiteClient } from '../db/sqliteClient.js';
dotenv.config();
const dbClient = new SQLiteClient();
await dbClient.connect();
const userService = new UserService(dbClient);
async function handleRegister(req, res) {
    const body = await parseBody(req);
    const { login, email, password } = JSON.parse(body);
    if (!login || !email || !password || password.length < 6) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'All fields are required, and password must be at least 6 characters.' }));
        return;
    }
    try {
        const existingUser = await userService.getUserByLogin(login);
        if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username already exists.' }));
            return;
        }
        const hashedPassword = await hashPassword(password);
        await userService.registerUser({ login, email, password: hashedPassword });
        const token = jwt.sign({ login }, process.env.JWT_SECRET || '', { expiresIn: '60d' });
        res.writeHead(201, {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
        });
        res.end(JSON.stringify({
            message: 'User registered successfully',
            user: { login, email },
        }));
    }
    catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Registration error.' }));
    }
}
async function handleLogin(req, res) {
    const body = await parseBody(req);
    const { login, password } = JSON.parse(body);
    try {
        const user = await userService.getUserByLogin(login);
        if (!user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid login or password' }));
            return;
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid login or password' }));
            return;
        }
        const token = jwt.sign({ id: user.id, login }, process.env.JWT_SECRET || '', { expiresIn: '60d' });
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
        });
        res.end(JSON.stringify({
            message: 'Login successful',
            user: { login, email: user.email },
        }));
    }
    catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error logging in.' }));
    }
}
async function handleCheckAuth(req, res) {
    const cookies = parseCookies(req);
    const token = cookies.token;
    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        const user = await userService.getUserByLogin(decoded.login);
        if (!user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Authenticated',
            user: { login: user.login, email: user.email },
        }));
    }
    catch (error) {
        console.error(error);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
    }
}
function handleLogout(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': 'token=; HttpOnly; Max-Age=0; Path=/',
    });
    res.end(JSON.stringify({ message: 'Logged out successfully' }));
}
async function handleUpdateUsername(req, res) {
    const cookies = parseCookies(req);
    const token = cookies.token;
    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        const body = await parseBody(req);
        const { newLogin } = JSON.parse(body);
        const existingUser = await userService.getUserByLogin(newLogin);
        if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username already exists.' }));
            return;
        }
        await userService.updateUsername(decoded.id, newLogin);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Username updated successfully.',
            newLogin,
        }));
    }
    catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to update username.' }));
    }
}
export default function usersRoutes(req, res) {
    const pathName = req.url?.split('?')[0];
    const method = req.method;
    if (pathName === '/users/register' && method === 'POST') {
        handleRegister(req, res);
    }
    else if (pathName === '/users/login' && method === 'POST') {
        handleLogin(req, res);
    }
    else if (pathName === '/users/checkAuth' && method === 'GET') {
        handleCheckAuth(req, res);
    }
    else if (pathName === '/users/logout' && method === 'POST') {
        handleLogout(req, res);
    }
    else if (pathName === '/users/updateUsername' && method === 'POST') {
        handleUpdateUsername(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}
