import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './db/database.js';
import { handleRoutes } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.BACKEND_PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

initDatabase();

function handleCorsPreflight(res, origin) {
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, OPTIONS, PUT',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
  } else {
    res.statusCode = 403;
    res.end();
    return;
  }
  res.writeHead(204);
  res.end();
}

function handleCorsHeaders(res, origin) {
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.statusCode = 403;
    res.end('CORS error: Origin not allowed');
    return false;
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return true;
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;
  const method = req.method;

  if (method === 'OPTIONS') {
    handleCorsPreflight(res, origin);
    return;
  }

  if (!handleCorsHeaders(res, origin)) {
    return;
  }

  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
