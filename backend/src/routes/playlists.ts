import {
  getPlaylistsByUserId,
  getPlaylistById,
  addPlaylist,
  deletePlaylistById,
  updatePlaylistOpenTime,
} from '../db/playlistModel.js';
import { parseBody } from '../utils/parseBody.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IncomingMessage, ServerResponse } from 'http';

dotenv.config();

async function handleAddPlaylist(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = (await parseBody(req)) as string;
    const { name, description, language } = JSON.parse(body);

    let userId: number;
    if (process.env.NODE_ENV === 'test') {
      userId = 1;
    } else {
      const token = req.headers.cookie?.split('token=')[1];
      if (!token || !process.env.JWT_SECRET) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      userId = decoded.id;
    }

    const newPlaylist = await addPlaylist({
      name,
      description,
      user_id: userId,
      language_code: language,
    });

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newPlaylist));
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errorMessage }));
    return;
  }
}

async function handleDeletePlaylist(req: IncomingMessage, res: ServerResponse, playlistId: string): Promise<void> {
  try {
    let userId: number;
    if (process.env.NODE_ENV === 'test') {
      userId = 1;
    } else {
      const token = req.headers.cookie?.split('token=')[1];
      if (!token || !process.env.JWT_SECRET) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      userId = decoded.id;
    }

    await deletePlaylistById(Number(playlistId), userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Playlist deleted successfully' }));
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errorMessage }));
    return;
  }
}

async function handleGetPlaylists(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    let userId: number;
    if (process.env.NODE_ENV === 'test') {
      userId = 1;
    } else {
      const token = req.headers.cookie?.split('token=')[1];
      if (!token || !process.env.JWT_SECRET) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      userId = decoded.id;
    }

    const playlists = await getPlaylistsByUserId(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(playlists));
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errorMessage }));
    return;
  }
}

async function handleGetPlaylistById(req: IncomingMessage, res: ServerResponse, playlistId: string): Promise<void> {
  try {
    const playlist = await getPlaylistById(Number(playlistId));
    if (playlist) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(playlist));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Playlist not found' }));
    }
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errorMessage }));
    return;
  }
}

async function handleOpenPlaylist(req: IncomingMessage, res: ServerResponse, playlistId: string): Promise<void> {
  try {
    const result = await updatePlaylistOpenTime(Number(playlistId));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: `Failed to update playlist open time: ${errorMessage}`,
      }),
    );
    return;
  }
}

export default async function playlistsRoutes(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const pathName = req.url?.split('?')[0] || '';
  const method = req.method;

  if (pathName === '/playlists' && method === 'POST') {
    await handleAddPlaylist(req, res);
  } else if (pathName.startsWith('/playlists/') && method === 'DELETE') {
    const playlistId = pathName.split('/')[2];
    await handleDeletePlaylist(req, res, playlistId);
  } else if (pathName.startsWith('/playlists/') && method === 'GET') {
    const playlistId = pathName.split('/')[2];
    await handleGetPlaylistById(req, res, playlistId);
  } else if (pathName === '/playlists' && method === 'GET') {
    await handleGetPlaylists(req, res);
  } else if (pathName.startsWith('/playlists/open/') && method === 'PUT') {
    const playlistId = pathName.split('/')[3];
    await handleOpenPlaylist(req, res, playlistId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }
}
