var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from './database.js';
const dbRun = (query, params) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err)
                reject(err);
            else
                resolve(this);
        });
    });
};
const dbGet = (query, params) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row || null);
            }
        });
    });
};
const dbAll = (query, params) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
export const getPlaylistsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return dbAll('SELECT * FROM playlists WHERE user_id = ?', [userId]);
});
export const getPlaylistById = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    return dbGet('SELECT * FROM playlists WHERE id = ?', [playlistId]);
});
export const addPlaylist = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, description, user_id, language_code, }) {
    if (!name || !user_id) {
        const missingFields = [];
        if (!name)
            missingFields.push('name');
        if (!user_id)
            missingFields.push('user_id');
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    const result = yield dbRun('INSERT INTO playlists (name, description, user_id, language_code, last_open_time) VALUES (?, ?, ?, ?, ?)', [name, description, user_id, language_code, 0]);
    return {
        id: result.lastID,
        name,
        description,
        user_id,
        language_code,
        last_open_time: 0,
        number_of_cards: 0,
    };
});
export const deletePlaylistById = (playlistId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dbRun('DELETE FROM playlists WHERE id = ? AND user_id = ?', [playlistId, userId]);
    if (result.changes === 0) {
        throw new Error('Playlist not found or unauthorized.');
    }
    return true;
});
export const updatePlaylistOpenTime = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = Date.now();
    const result = yield dbRun('UPDATE playlists SET last_open_time = ? WHERE id = ?', [
        currentTime,
        playlistId,
    ]);
    if (result.changes === 0) {
        throw new Error('Playlist not found');
    }
    return {
        message: 'Playlist open time updated',
        last_open_time: currentTime,
    };
});
