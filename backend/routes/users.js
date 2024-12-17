import { parseBody } from '../utils/parseBody.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import { addUser, getUserByLogin, updateUsername } from '../db/userModel.js';
import dotenv from 'dotenv';
import { parseCookies } from '../utils/main.js';
import { getPlaylistsByUserId } from '../db/playlistModel.js';
import { getWordsByUserId } from '../db/wordModel.js';

dotenv.config();

async function handleRegister(req, res) {
  const body = await parseBody(req);
  const { login, email, password } = JSON.parse(body);

  if (password.length < 6) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ error: 'Password must be at least 6 characters.' }),
    );
    return;
  }

  getUserByLogin(login, async (err, existingUser) => {
    if (existingUser) {
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
        const token = jwt.sign(
          { id: result.lastID, login },
          process.env.JWT_SECRET,
          { expiresIn: '60d' },
        );
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
}

async function handleLogin(req, res) {
  const body = await parseBody(req);
  const { login, password } = JSON.parse(body);

  getUserByLogin(login, async (err, user) => {
    if (err || !user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid login or password' }));
    } else {
      const words = await getWordsByUserId(user.id);
      const passwordMatch = await comparePassword(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user.id, login }, process.env.JWT_SECRET, {
          expiresIn: '60d',
        });
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
}

async function handleCheckAuth(req, res) {
  const cookies = parseCookies(req);
  const token = cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
      } else {
        getUserByLogin(decoded.login, async (err, user) => {
          if (err || !user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
          } else {
            console.log('Authenticated');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                message: 'Authenticated',
                user: { login: user.login, email: user.email },
                playlists: await getPlaylistsByUserId(user.id),
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

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not authenticated' }));
      } else {
        const body = await parseBody(req);
        const { newLogin } = JSON.parse(body);

        getUserByLogin(newLogin, async (err, existingUser) => {
          if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username already exists.' }));
          } else {
            updateUsername(decoded.id, newLogin, (err) => {
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

export default function usersRoutes(req, res) {
  const pathName = req.url.split('?')[0];
  const method = req.method;

  if (pathName === '/users/register' && method === 'POST') {
    return handleRegister(req, res);
  } else if (pathName === '/users/login' && method === 'POST') {
    return handleLogin(req, res);
  } else if (pathName === '/users/checkAuth' && method === 'GET') {
    return handleCheckAuth(req, res);
  } else if (pathName === '/users/logout' && method === 'POST') {
    return handleLogout(req, res);
  } else if (pathName === '/users/updateUsername' && method === 'POST') {
    return handleUpdateUsername(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
