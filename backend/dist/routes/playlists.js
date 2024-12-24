var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPlaylistsByUserId, getPlaylistById, addPlaylist, deletePlaylistById, updatePlaylistOpenTime, } from '../db/playlistModel.js';
import { parseBody } from '../utils/parseBody.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
function handleAddPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const body = (yield parseBody(req));
            const { name, description, language } = JSON.parse(body);
            let userId;
            if (process.env.NODE_ENV === 'test') {
                userId = 1;
            }
            else {
                const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('token=')[1];
                if (!token || !process.env.JWT_SECRET) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Unauthorized' }));
                    return;
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;
            }
            const newPlaylist = yield addPlaylist({
                name,
                description,
                user_id: userId,
                language_code: language,
            });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newPlaylist));
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage }));
            return;
        }
    });
}
function handleDeletePlaylist(req, res, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let userId;
            if (process.env.NODE_ENV === 'test') {
                userId = 1;
            }
            else {
                const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('token=')[1];
                if (!token || !process.env.JWT_SECRET) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Unauthorized' }));
                    return;
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;
            }
            yield deletePlaylistById(Number(playlistId), userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Playlist deleted successfully' }));
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage }));
            return;
        }
    });
}
function handleGetPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let userId;
            if (process.env.NODE_ENV === 'test') {
                userId = 1;
            }
            else {
                const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('token=')[1];
                if (!token || !process.env.JWT_SECRET) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Unauthorized' }));
                    return;
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;
            }
            const playlists = yield getPlaylistsByUserId(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(playlists));
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage }));
            return;
        }
    });
}
function handleGetPlaylistById(req, res, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlist = yield getPlaylistById(Number(playlistId));
            if (playlist) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(playlist));
            }
            else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Playlist not found' }));
            }
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage }));
            return;
        }
    });
}
function handleOpenPlaylist(req, res, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield updatePlaylistOpenTime(Number(playlistId));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: `Failed to update playlist open time: ${errorMessage}`,
            }));
            return;
        }
    });
}
export default function playlistsRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const pathName = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) || '';
        const method = req.method;
        if (pathName === '/playlists' && method === 'POST') {
            yield handleAddPlaylist(req, res);
        }
        else if (pathName.startsWith('/playlists/') && method === 'DELETE') {
            const playlistId = pathName.split('/')[2];
            yield handleDeletePlaylist(req, res, playlistId);
        }
        else if (pathName.startsWith('/playlists/') && method === 'GET') {
            const playlistId = pathName.split('/')[2];
            yield handleGetPlaylistById(req, res, playlistId);
        }
        else if (pathName === '/playlists' && method === 'GET') {
            yield handleGetPlaylists(req, res);
        }
        else if (pathName.startsWith('/playlists/open/') && method === 'PUT') {
            const playlistId = pathName.split('/')[3];
            yield handleOpenPlaylist(req, res, playlistId);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
    });
}
