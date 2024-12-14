import { parseBody } from '../utils/parseBody.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Mock data
const playlists = [
  { id: 1, name: 'Playlist 1', description: 'First playlist', user_id: 1, language_code: 'en', number_of_cards: 5, last_open_time: 1625154461 },
  { id: 2, name: 'Playlist 2', description: 'Second playlist', user_id: 1, language_code: 'es', number_of_cards: 3, last_open_time: 1625254461 },
];

// Handlers
async function handleAddPlaylist(req, res) {
  const body = await parseBody(req);
  const { name, description, language } = JSON.parse(body);

  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const newPlaylist = {
    id: playlists.length + 1,
    name,
    description,
    user_id: userId,
    language_code: language,
    number_of_cards: 0,
    last_open_time: 0,
  };

  playlists.push(newPlaylist);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newPlaylist));
}

async function handleDeletePlaylist(req, res, playlistId) {
  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const playlistIndex = playlists.findIndex((pl) => pl.id === parseInt(playlistId) && pl.user_id === userId);
  if (playlistIndex !== -1) {
    playlists.splice(playlistIndex, 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Playlist deleted successfully' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Playlist not found' }));
  }
}

async function handleGetPlaylists(req, res) {
  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const userPlaylists = playlists.filter((pl) => pl.user_id === userId);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(userPlaylists));
}

async function handleGetPlaylistById(req, res, playlistId) {
  const playlist = playlists.find((pl) => pl.id === parseInt(playlistId));
  if (playlist) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(playlist));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Playlist not found' }));
  }
}

async function handleOpenPlaylist(req, res, playlistId) {
  const playlist = playlists.find((pl) => pl.id === parseInt(playlistId));
  if (playlist) {
    playlist.last_open_time = Date.now();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(playlist));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Playlist not found' }));
  }
}

// Routes
export default function playlistsRoutes(req, res) {
  const pathName = req.url.split('?')[0];
  const method = req.method;

  if (pathName === '/playlists' && method === 'POST') {
    return handleAddPlaylist(req, res);
  } else if (pathName.startsWith('/playlists/') && method === 'DELETE') {
    const playlistId = pathName.split('/')[2];
    return handleDeletePlaylist(req, res, playlistId);
  } else if (pathName.startsWith('/playlists/') && method === 'GET') {
    const playlistId = pathName.split('/')[2];
    return handleGetPlaylistById(req, res, playlistId);
  } else if (pathName === '/playlists' && method === 'GET') {
    return handleGetPlaylists(req, res);
  } else if (pathName.startsWith('/playlists/open/') && method === 'PUT') {
    const playlistId = pathName.split('/')[3];
    return handleOpenPlaylist(req, res, playlistId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
