import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './db/database.js';
import { handleRoutes } from './routes/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const PORT = process.env.BACKEND_PORT || 5001;
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [];
console.log('Allowed Origins:', allowedOrigins);
initDatabase();
function handleCorsPreflight(res, origin) {
    console.log('Preflight Request Origin:', origin);
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.writeHead(204);
        res.end();
    }
    else {
        console.log('CORS Preflight Rejected:', origin);
        res.statusCode = 403;
        res.end();
    }
}
function handleCorsHeaders(res, origin) {
    console.log('Request Origin:', origin);
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return true;
    }
    else {
        console.log('CORS Request Rejected:', origin);
        res.statusCode = 403;
        res.end('CORS error: Origin not allowed');
        return false;
    }
}
const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    const method = req.method;
    console.log(`Incoming request: ${method} ${req.url}`);
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
