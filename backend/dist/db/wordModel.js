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
function incrementWordCount(playlistId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE playlists SET number_of_cards = number_of_cards + 1 WHERE id = ?';
        db.run(query, [playlistId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
}
function decrementWordCount(playlistId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE playlists SET number_of_cards = number_of_cards - 1 WHERE id = ?';
        db.run(query, [playlistId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
}
function getWordsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM words WHERE user_id = ?', [userId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows || []);
        });
    });
}
function addWord(wordData) {
    const { word, translation, next_review_time, user_id, playlist_id = null, } = wordData;
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO words (word, translation, next_review_time, user_id, playlist_id) VALUES (?, ?, ?, ?, ?)', [word, translation, next_review_time, user_id, playlist_id], function (err) {
            if (err) {
                reject(err);
            }
            else {
                if (playlist_id) {
                    incrementWordCount(playlist_id)
                        .then(() => resolve({ id: this.lastID }))
                        .catch(reject);
                }
                else {
                    resolve({ id: this.lastID });
                }
            }
        });
    });
}
function deleteWordById(wordId, userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT playlist_id FROM words WHERE id = ? AND user_id = ?', [wordId, userId], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                const query = 'DELETE FROM words WHERE id = ? AND user_id = ?';
                db.run(query, [wordId, userId], function (deleteErr) {
                    if (deleteErr) {
                        reject(deleteErr);
                    }
                    else if (row && row.playlist_id) {
                        decrementWordCount(row.playlist_id)
                            .then(() => resolve())
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
}
function updateWordById(wordId, updatedWordData) {
    const { word, translation, user_id, playlist_id } = updatedWordData;
    return new Promise((resolve, reject) => {
        db.get('SELECT playlist_id FROM words WHERE id = ?', [wordId], (err, row) => {
            if (err)
                reject(err);
            else {
                const oldPlaylistId = row ? row.playlist_id : null;
                db.run('UPDATE words SET word = ?, translation = ?, playlist_id = ? WHERE id = ? AND user_id = ?', [word, translation, playlist_id, wordId, user_id], function (updateErr) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (updateErr)
                            reject(updateErr);
                        else {
                            try {
                                if (oldPlaylistId !== playlist_id) {
                                    if (oldPlaylistId)
                                        yield decrementWordCount(oldPlaylistId);
                                    if (playlist_id)
                                        yield incrementWordCount(playlist_id);
                                }
                                resolve(this.changes);
                            }
                            catch (counterErr) {
                                reject(counterErr);
                            }
                        }
                    });
                });
            }
        });
    });
}
const updateWordStage = (wordId, stage, nextReviewTime) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE words SET review_stage = ?, next_review_time = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(query, [stage, nextReviewTime, wordId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
});
export { getWordsByUserId, addWord, deleteWordById, updateWordById, updateWordStage, };
