import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './db/database.js'; 
import { handleRoutes } from './routes/index.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.NODE_ENV === 'test' ? 0 : process.env.BACKEND_PORT || 5001;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

if (process.env.NODE_ENV !== 'test') {
  initDatabase();
}

function handleCorsPreflight(res: ServerResponse, origin?: string): void {
  if (process.env.NODE_ENV === 'test' || (origin && allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    res.statusCode = 403;
    res.end('CORS error: Origin not allowed');
    return;
  }
  res.writeHead(204);
  res.end();
}

function handleCorsHeaders(res: ServerResponse, origin?: string): boolean {
  if (process.env.NODE_ENV === 'test' || (origin && allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
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

const app = (req: IncomingMessage, res: ServerResponse): void => {
  const origin = req.headers.origin;
  const method = req.method;

  if (method === 'OPTIONS') {
    handleCorsPreflight(res, origin);
    return;
  }

  if (process.env.NODE_ENV !== 'test') {
    if (!handleCorsHeaders(res, origin)) {
      return;
    }
  }

  handleRoutes(req, res); 
};

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `Backend server is running on port ${PORT} in ${process.env.NODE_ENV} mode TYPESCRIPT123`,
  );
});

export default server;
