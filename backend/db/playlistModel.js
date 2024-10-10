// playlistModel.js

import { db } from './database.js';

// Функция для получения всех плейлистов пользователя по ID пользователя
export const getPlaylistsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM playlists WHERE user_id = ?',
            [userId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

// Функция для получения плейлиста по ID
export const getPlaylistById = (playlistId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM playlists WHERE id = ?', [playlistId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Функция для добавления нового плейлиста
export const addPlaylist = ({ name, description, user_id }) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO playlists (name, description, user_id) VALUES (?, ?, ?)',
            [name, description, user_id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, name, description, user_id });
                }
            }
        );
    });
};

// Функция для удаления плейлиста по ID
export const deletePlaylistById = (playlistId, userId) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM playlists WHERE id = ? AND user_id = ?', [playlistId, userId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};
