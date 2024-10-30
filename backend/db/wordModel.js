// wordModel.js
import { db } from './database.js';

// Увеличивает количество слов в указанном плейлисте
function incrementWordCount(playlistId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE playlists SET number_of_cards = number_of_cards + 1 WHERE id = ?';
        db.run(query, [playlistId], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

// Уменьшает количество слов в указанном плейлисте
function decrementWordCount(playlistId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE playlists SET number_of_cards = number_of_cards - 1 WHERE id = ?';
        db.run(query, [playlistId], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

// Получение слов по user_id
function getWordsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM words WHERE user_id = ?', [userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
}

// Добавление нового слова и обновление счетчика в плейлисте
function addWord(wordData) {
    const { word, translation, next_review_time, user_id, playlist_id = null } = wordData;
    console.log(wordData)
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO words (word, translation, next_review_time, user_id, playlist_id) VALUES (?, ?, ?, ?, ?)',
            [word, translation, next_review_time, user_id, playlist_id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (playlist_id) {
                        db.run('UPDATE playlists SET number_of_cards = number_of_cards + 1 WHERE id = ?', [playlist_id], (updateErr) => {
                            if (updateErr) reject(updateErr);
                            else resolve({ id: this.lastID });
                        });
                    } else {
                        console.log('No playlist_id');
                        resolve({ id: this.lastID });
                    }
                }
            }
        );
    });
}



// Удаление слова по его ID и обновление счетчика плейлиста
function deleteWordById(wordId, userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT playlist_id FROM words WHERE id = ? AND user_id = ?', [wordId, userId], (err, row) => {
            if (err) reject(err);
            else {
                const query = 'DELETE FROM words WHERE id = ? AND user_id = ?';
                db.run(query, [wordId, userId], function (deleteErr) {
                    if (deleteErr) reject(deleteErr);
                    else if (row && row.playlist_id) {
                        decrementWordCount(row.playlist_id).then(resolve).catch(reject);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

// Обновление слова по ID и изменение привязки к плейлисту с обновлением счетчиков
function updateWordById(wordId, updatedWordData) {
    const { word, translation, user_id, playlistId } = updatedWordData;

    return new Promise((resolve, reject) => {
        db.get('SELECT playlist_id FROM words WHERE id = ?', [wordId], (err, row) => {
            if (err) reject(err);
            else {
                const oldPlaylistId = row ? row.playlist_id : null;

                db.run(
                    'UPDATE words SET word = ?, translation = ?, playlist_id = ? WHERE id = ? AND user_id = ?',
                    [word, translation, playlistId, wordId, user_id],
                    async function (updateErr) {
                        if (updateErr) reject(updateErr);
                        else {
                            try {
                                // Обновляем счетчики плейлистов, если плейлист изменился
                                console.log(oldPlaylistId, playlistId);
                                if (oldPlaylistId !== playlistId) {
                                    if (oldPlaylistId) await decrementWordCount(oldPlaylistId);
                                    if (playlistId) await incrementWordCount(playlistId);
                                }
                                resolve(this.changes);
                            } catch (counterErr) {
                                reject(counterErr);
                            }
                        }
                    }
                );
            }
        });
    });
}

// Обновляем стадию и время для слова
const updateWordStage = async (wordId, stage, nextReviewTime) => {
    const query = 'UPDATE words SET review_stage = ?, next_review_time = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(query, [stage, nextReviewTime, wordId], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export { getWordsByUserId, addWord, deleteWordById, updateWordById, updateWordStage };
