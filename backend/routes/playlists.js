import {
    getPlaylistsByUserId,
    getPlaylistById,
    addPlaylist,
    deletePlaylistById,
    updatePlaylistOpenTime
} from '../db/playlistModel.js';
import { parseBody } from '../utils/parseBody.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function handleAddPlaylist(req, res) {
    const body = await parseBody(req);
    const { name, description, language } = JSON.parse(body);
    const token = req.headers.cookie.split('token=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const newPlaylist = await addPlaylist({ name, description, user_id: userId, language_code: language });
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newPlaylist));
}

async function handleDeletePlaylist(req, res, playlistId) {
    const token = req.headers.cookie.split('token=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await deletePlaylistById(playlistId, userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Playlist deleted successfully' }));
}

async function handleGetPlaylists(req, res) {
    const token = req.headers.cookie.split('token=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const playlists = await getPlaylistsByUserId(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(playlists));
}

async function handleGetPlaylistById(req, res, playlistId) {
    const playlist = await getPlaylistById(playlistId);
    if (playlist) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(playlist));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Playlist not found' }));
    }
}

async function handleOpenPlaylist(req, res, playlistId) {
    try {
        const result = await updatePlaylistOpenTime(playlistId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to update playlist open time' }));
    }
}

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
