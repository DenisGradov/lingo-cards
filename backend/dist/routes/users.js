var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseBody } from '../utils/parseBody.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { parseCookies } from '../utils/main.js';
import { addUser, getUserByLogin, updateUsername } from '../db/userModel.js';
import { getPlaylistsByUserId } from '../db/playlistModel.js';
import { getWordsByUserId } from '../db/wordModel.js';
dotenv.config();
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield parseBody(req);
            const { login, email, password } = JSON.parse(body);
            if (password.length < 6) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Password must be at least 6 characters.' }));
                return;
            }
            getUserByLogin(login, (err, existingUser) => __awaiter(this, void 0, void 0, function* () {
                if (err || existingUser) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Username already exists.' }));
                    return;
                }
                const hashedPassword = yield hashPassword(password);
                const user = { login, email, password: hashedPassword };
                addUser(user, (err, result) => {
                    if (err) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Registration error.' }));
                    }
                    else {
                        const secret = process.env.JWT_SECRET || '';
                        const token = jwt.sign({ id: result.id, login }, secret, { expiresIn: '60d' });
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
                        });
                        res.end(JSON.stringify({
                            message: 'User registered successfully',
                            user: { login, email },
                        }));
                    }
                });
            }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield parseBody(req);
            const { login, password } = JSON.parse(body);
            getUserByLogin(login, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (err || !user) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid login or password' }));
                }
                else {
                    const words = yield getWordsByUserId(user.id);
                    const passwordMatch = yield comparePassword(password, user.password);
                    if (passwordMatch) {
                        const secret = process.env.JWT_SECRET || '';
                        const token = jwt.sign({ id: user.id, login }, secret, { expiresIn: '60d' });
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
                        });
                        res.end(JSON.stringify({
                            message: 'Login successful',
                            user: { login, email: user.email },
                            words,
                        }));
                    }
                    else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid login or password' }));
                    }
                }
            }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
function handleCheckAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = parseCookies(req);
        const token = cookies === null || cookies === void 0 ? void 0 : cookies.token;
        if (token) {
            const secret = process.env.JWT_SECRET || '';
            jwt.verify(token, secret, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err || !decoded || typeof decoded === 'string') {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Not authenticated' }));
                }
                else {
                    const { login } = decoded;
                    getUserByLogin(login, (err, user) => __awaiter(this, void 0, void 0, function* () {
                        if (err || !user) {
                            res.writeHead(401, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Not authenticated' }));
                        }
                        else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                message: 'Authenticated',
                                user: { login: user.login, email: user.email },
                                playlists: yield getPlaylistsByUserId(user.id),
                            }));
                        }
                    }));
                }
            }));
        }
        else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
        }
    });
}
function handleLogout(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': 'token=; HttpOnly; Max-Age=0; Path=/',
    });
    res.end(JSON.stringify({ message: 'Logged out successfully' }));
}
function handleUpdateUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = parseCookies(req);
        const token = cookies === null || cookies === void 0 ? void 0 : cookies.token;
        if (token) {
            const secret = process.env.JWT_SECRET || '';
            jwt.verify(token, secret, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err || !decoded) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Not authenticated' }));
                }
                else {
                    const body = yield parseBody(req);
                    const { newLogin } = JSON.parse(body);
                    getUserByLogin(newLogin, (err, existingUser) => __awaiter(this, void 0, void 0, function* () {
                        if (existingUser) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Username already exists.' }));
                        }
                        else {
                            const { id } = decoded;
                            updateUsername(id, newLogin, (err) => {
                                if (err) {
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Failed to update username.' }));
                                }
                                else {
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({
                                        message: 'Username updated successfully.',
                                        newLogin,
                                    }));
                                }
                            });
                        }
                    }));
                }
            }));
        }
        else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
        }
    });
}
export default function usersRoutes(req, res) {
    var _a;
    const pathName = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0];
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
