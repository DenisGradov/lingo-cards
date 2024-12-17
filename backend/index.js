const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const { initDatabase } = require('./db/database.js');
const { handleRoutes } = require('./routes/index.js');

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.BACKEND_PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

function handleCorsPreflight(res, origin) {
  if (process.env.NODE_ENV === 'test' || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
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
  if (process.env.NODE_ENV === 'test' || allowedOrigins.includes(origin)) {
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

const app = (req, res) => {
  const origin = req.headers.origin;
  const method = req.method;

  //Skipping CORS for tests 
  if (process.env.NODE_ENV === 'test') {
    handleRoutes(req, res);
    return;
  }

  if (method === 'OPTIONS') {
    handleCorsPreflight(res, origin);
    return;
  }

  if (!handleCorsHeaders(res, origin)) {
    return;
  }

  handleRoutes(req, res);
};

export const server = http.createServer(app);