import { db } from './database.js';

type Word = {
  id: number;
  word: string;
  translation: string;
  next_review_time: number;
  user_id: number;
  playlist_id: number | null;
  review_stage: number;
};

type WordData = Omit<Word, 'id'>;

type Playlist = {
  id: number;
  number_of_cards: number;
};

function incrementWordCount(playlistId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE playlists SET number_of_cards = number_of_cards + 1 WHERE id = ?';
    db.run(query, [playlistId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

function decrementWordCount(playlistId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE playlists SET number_of_cards = number_of_cards - 1 WHERE id = ?';
    db.run(query, [playlistId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

function getWordsByUserId(userId: number): Promise<Word[]> {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM words WHERE user_id = ?',
      [userId],
      (err, rows: Word[]) => {
        if (err) reject(err);
        else resolve(rows || []);
      },
    );
  });
}

function addWord(wordData: WordData): Promise<{ id: number }> {
  const {
    word,
    translation,
    next_review_time,
    user_id,
    playlist_id = null,
  } = wordData;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO words (word, translation, next_review_time, user_id, playlist_id) VALUES (?, ?, ?, ?, ?)',
      [word, translation, next_review_time, user_id, playlist_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          if (playlist_id) {
            incrementWordCount(playlist_id)
              .then(() => resolve({ id: this.lastID }))
              .catch(reject);
          } else {
            resolve({ id: this.lastID });
          }
        }
      },
    );
  });
}

function deleteWordById(wordId: number, userId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT playlist_id FROM words WHERE id = ? AND user_id = ?',
      [wordId, userId],
      (err, row: { playlist_id: number | null }) => {
        if (err) {
          reject(err);
        } else {
          const query = 'DELETE FROM words WHERE id = ? AND user_id = ?';
          db.run(query, [wordId, userId], function (deleteErr) {
            if (deleteErr) {
              reject(deleteErr);
            } else if (row && row.playlist_id) {
              decrementWordCount(row.playlist_id)
                .then(() => resolve()) 
                .catch(reject);
            } else {
              resolve();
            }
          });
        }
      },
    );
  });
}


function updateWordById(
  wordId: number,
  updatedWordData: Partial<WordData>,
): Promise<number> {
  const { word, translation, user_id, playlist_id } = updatedWordData;

  return new Promise((resolve, reject) => {
    db.get(
      'SELECT playlist_id FROM words WHERE id = ?',
      [wordId],
      (err, row: { playlist_id: number | null }) => {
        if (err) reject(err);
        else {
          const oldPlaylistId = row ? row.playlist_id : null;

          db.run(
            'UPDATE words SET word = ?, translation = ?, playlist_id = ? WHERE id = ? AND user_id = ?',
            [word, translation, playlist_id, wordId, user_id],
            async function (updateErr) {
              if (updateErr) reject(updateErr);
              else {
                try {
                  if (oldPlaylistId !== playlist_id) {
                    if (oldPlaylistId) await decrementWordCount(oldPlaylistId);
                    if (playlist_id) await incrementWordCount(playlist_id);
                  }
                  resolve(this.changes);
                } catch (counterErr) {
                  reject(counterErr);
                }
              }
            },
          );
        }
      },
    );
  });
}

const updateWordStage = async (
  wordId: number,
  stage: number,
  nextReviewTime: number,
): Promise<number> => {
  const query =
    'UPDATE words SET review_stage = ?, next_review_time = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.run(query, [stage, nextReviewTime, wordId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

export {
  getWordsByUserId,
  addWord,
  deleteWordById,
  updateWordById,
  updateWordStage,
};
