import { db } from './database.js';

export type Playlist = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  language_code: string;
  last_open_time: number;
  number_of_cards: number;
};

const dbRun = (query: string, params: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = <T = any>(query: string, params: any[]): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve((row as T) || null); 
      }
    });
  });
};

const dbAll = <T = any>(query: string, params: any[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as T[]); 
      }
    });
  });
};

export const getPlaylistsByUserId = async (userId: number): Promise<Playlist[]> => {
  return dbAll<Playlist>('SELECT * FROM playlists WHERE user_id = ?', [userId]);
};

export const getPlaylistById = async (playlistId: number): Promise<Playlist | null> => {
  return dbGet<Playlist>('SELECT * FROM playlists WHERE id = ?', [playlistId]);
};

export const addPlaylist = async ({
  name,
  description,
  user_id,
  language_code,
}: {
  name: string;
  description: string;
  user_id: number;
  language_code: string;
}): Promise<Playlist> => {
  if (!name || !user_id) {
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!user_id) missingFields.push('user_id');
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const result = await dbRun(
    'INSERT INTO playlists (name, description, user_id, language_code, last_open_time) VALUES (?, ?, ?, ?, ?)',
    [name, description, user_id, language_code, 0],
  );

  return {
    id: result.lastID,
    name,
    description,
    user_id,
    language_code,
    last_open_time: 0,
    number_of_cards: 0,
  };
};

export const deletePlaylistById = async (playlistId: number, userId: number): Promise<boolean> => {
  const result = await dbRun(
    'DELETE FROM playlists WHERE id = ? AND user_id = ?',
    [playlistId, userId],
  );

  if (result.changes === 0) {
    throw new Error('Playlist not found or unauthorized.');
  }

  return true;
};

export const updatePlaylistOpenTime = async (playlistId: number): Promise<{ message: string; last_open_time: number }> => {
  const currentTime = Date.now();
  const result = await dbRun('UPDATE playlists SET last_open_time = ? WHERE id = ?', [
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
};
