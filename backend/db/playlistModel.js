import { db } from './database.js';

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
      },
    );
  });
};

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

export const addPlaylist = ({ name, description, user_id, language_code }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO playlists (name, description, user_id, language_code, last_open_time) VALUES (?, ?, ?, ?, ?)',
      [name, description, user_id, language_code, 0],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            description,
            user_id,
            language_code,
            last_open_time: 0,
            number_of_cards: 0,
          });
        }
      },
    );
  });
};

export const deletePlaylistById = (playlistId, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM playlists WHERE id = ? AND user_id = ?',
      [playlistId, userId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      },
    );
  });
};

export const updatePlaylistOpenTime = (playlistId) => {
  return new Promise((resolve, reject) => {
    const currentTime = Date.now();
    db.run(
      'UPDATE playlists SET last_open_time = ? WHERE id = ?',
      [currentTime, playlistId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: 'Playlist open time updated',
            last_open_time: currentTime,
          });
        }
      },
    );
  });
};
