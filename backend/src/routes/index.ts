import usersRoutes from './users.js';
import wordsRoutes from './words.js';
import playlistsRoutes from './playlists.js';
import { IncomingMessage, ServerResponse } from 'http';

export async function handleRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const pathName = req.url?.split('?')[0] || '';

  if (pathName.startsWith('/users')) {
    await usersRoutes(req, res);
  } else if (pathName.startsWith('/words')) {
    await wordsRoutes(req, res);
  } else if (pathName.startsWith('/playlists')) {
    await playlistsRoutes(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
