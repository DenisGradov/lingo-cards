import { IncomingMessage, ServerResponse } from 'http';
import { parseBody } from '../utils/parseBody.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { parseCookies } from '../utils/main.js';
import { addUser, getUserByLogin, updateUsername, User } from '../db/userModel.js';
import { getPlaylistsByUserId } from '../db/playlistModel.js';
import { getWordsByUserId } from '../db/wordModel.js';

dotenv.config();

async function handleRegister(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseBody(req);
    const { login, email, password } = JSON.parse(body as string);

    if (password.length < 6) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Password must be at least 6 characters.' }));
      return;
    }

    getUserByLogin(login, async (err, existingUser) => {
      if (err || existingUser) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Username already exists.' }));
        return;
      }

      const hashedPassword = await hashPassword(password);
      const user = { login, email, password: hashedPassword };

      addUser(user, (err, result) => {
        if (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Registration error.' }));
        } else {
          const secret = process.env.JWT_SECRET || '';
          const token = jwt.sign({ id: result.id, login }, secret, { expiresIn: '60d' });
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
          });
          res.end(
            JSON.stringify({
              message: 'User registered successfully',
              user: { login, email },
            }),
          );
        }
      });
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}

async function handleLogin(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseBody(req);
    const { login, password } = JSON.parse(body as string);

    getUserByLogin(login, async (err, user) => {
      if (err || !user) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid login or password' }));
      } else {
        const words = await getWordsByUserId(user.id!);
        const passwordMatch = await comparePassword(password, user.password);
        if (passwordMatch) {
          const secret = process.env.JWT_SECRET || '';
          const token = jwt.sign({ id: user.id, login }, secret, { expiresIn: '60d' });
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; HttpOnly; Path=/`,
          });
          res.end(
            JSON.stringify({
              message: 'Login successful',
              user: { login, email: user.email },
              words,
            }),
          );
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid login or password' }));
        }
      }
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}

async function handleCheckAuth(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const cookies = parseCookies(req) as { token?: string };
  const token = cookies?.token;
  if (token) {
    const secret = process.env.JWT_SECRET || '';
    jwt.verify(token, secret, async (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
      } else {
        const { login } = decoded as JwtPayload;
        getUserByLogin(login, async (err, user) => {
          if (err || !user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                message: 'Authenticated',
                user: { login: user.login, email: user.email },
                playlists: await getPlaylistsByUserId(user.id!),
              }),
            );
          }
        });
      }
    });
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not authenticated' }));
  }
}

function handleLogout(req: IncomingMessage, res: ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Set-Cookie': 'token=; HttpOnly; Max-Age=0; Path=/',
  });
  res.end(JSON.stringify({ message: 'Logged out successfully' }));
}

async function handleUpdateUsername(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const cookies = parseCookies(req) as { token?: string };
  const token = cookies?.token;

  if (token) {
    const secret = process.env.JWT_SECRET || '';
    jwt.verify(token, secret, async (err, decoded) => {
      if (err || !decoded) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
      } else {
        const body = await parseBody(req);
        const { newLogin } = JSON.parse(body as string);

        getUserByLogin(newLogin, async (err, existingUser) => {
          if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username already exists.' }));
          } else {
            const { id } = decoded as JwtPayload;
            updateUsername(id as number, newLogin, (err) => {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({ error: 'Failed to update username.' }),
                );
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({
                    message: 'Username updated successfully.',
                    newLogin,
                  }),
                );
              }
            });
          }
        });
      }
    });
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not authenticated' }));
  }
}

export default function usersRoutes(req: IncomingMessage, res: ServerResponse): void {
  const pathName = req.url?.split('?')[0];
  const method = req.method;

  if (pathName === '/users/register' && method === 'POST') {
    handleRegister(req, res);
  } else if (pathName === '/users/login' && method === 'POST') {
    handleLogin(req, res);
  } else if (pathName === '/users/checkAuth' && method === 'GET') {
    handleCheckAuth(req, res);
  } else if (pathName === '/users/logout' && method === 'POST') {
    handleLogout(req, res);
  } else if (pathName === '/users/updateUsername' && method === 'POST') {
    handleUpdateUsername(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
