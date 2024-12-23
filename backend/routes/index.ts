import { IncomingMessage, ServerResponse } from 'http';
import usersRoutes from './usersRoutes.js';

export function handleRoutes(req: IncomingMessage, res: ServerResponse): void {
  const pathName = req.url?.split('?')[0];

  if (!pathName) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request: No URL');
    return;
  }

  if (pathName.startsWith('/users')) {
    usersRoutes(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
