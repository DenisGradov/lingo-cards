const http = require('http');
const url = require('url');
const dotenv = require('dotenv');
const path = require('path');
const { initDatabase, addUser, getUserByLogin } = require('./db/database');
const { hashPassword, comparePassword } = require('./utils/password');
const { parseBody } = require('./utils/parseBody');
const jwt = require('jsonwebtoken');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.BACKEND_PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [];

initDatabase();

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathName = parsedUrl.pathname;
    const origin = req.headers.origin;

    // Handle CORS preflight request
    if (method === 'OPTIONS') {
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );
        } else {
            res.statusCode = 403;
            res.end();
            return;
        }
        res.writeHead(204);
        res.end();
        return;
    }

    // CORS headers
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
        res.statusCode = 403;
        res.end('CORS error: Origin not allowed');
        return;
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    if (pathName === '/helloworld' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    } else if (pathName === '/register' && method === 'POST') {
        let body = await parseBody(req);
        const { login, email, password } = JSON.parse(body);

        // Проверка длины пароля
        if (password.length < 6) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Пароль должен быть не менее 6 символов.' }));
            return;
        }

        // Проверка корректности email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Некорректный формат почты.' }));
            return;
        }

        // Проверка существования логина
        getUserByLogin(login, async (err, existingUser) => {
            if (existingUser) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Логин уже существует.' }));
                return;
            }

            // Хеширование пароля и создание пользователя
            const hashedPassword = await hashPassword(password);
            const user = { login, email, password: hashedPassword };

            addUser(user, function (err, result) {
                if (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Ошибка регистрации.' }));
                } else {
                    const userId = result.lastID;
                    const token = jwt.sign({ id: userId, login: login }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
                    });
                    // Возвращаем логин и email после успешной регистрации
                    res.end(JSON.stringify({
                        message: 'User registered successfully',
                        user: {
                            login: login,   // Передаем логин
                            email: email    // Передаем email
                        }
                    }));
                }
            });
        });
    }
    else if (pathName === '/login' && method === 'POST') {
        let body = await parseBody(req);
        const { login, password } = JSON.parse(body);

        getUserByLogin(login, async (err, user) => {
            if (err || !user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid login or password' }));
            } else {
                const passwordMatch = await comparePassword(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // Возвращаем логин и email вместе с токеном
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
                    });
                    res.end(JSON.stringify({
                        message: 'Login successful',
                        user: { login: user.login, email: user.email }  // Возвращаем логин вместо user.name
                    }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid login or password' }));
                }

            }
        });
    } else if (pathName === '/checkAuth' && method === 'GET') {
        const cookies = parseCookies(req);
        const token = cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Not authenticated' }));
                } else {
                    // Получаем информацию о пользователе из БД по логину
                    getUserByLogin(decoded.login, (err, user) => {
                        if (err || !user) {
                            res.writeHead(401, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Not authenticated' }));
                        } else {
                            // Возвращаем имя пользователя и email
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                message: 'Authenticated',
                                user: {
                                    login: user.login,   // Передаем логин
                                    email: user.email    // Передаем почту
                                }
                            }));
                        }
                    });
                }
            });
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
        }
    } else if (pathName === '/logout' && method === 'POST') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': 'token=; HttpOnly; Max-Age=0; Path=/',
        });
        res.end(JSON.stringify({ message: 'Logged out successfully' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});

function parseCookies(req) {
    const list = {};
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            let [name, ...rest] = cookie.split('=');
            name = name.trim();
            const value = rest.join('=').trim();
            if (!value) return;
            list[name] = decodeURIComponent(value);
        });
    }
    return list;
}
