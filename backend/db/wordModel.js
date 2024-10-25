// wordModel.js
import { db } from './database.js';

// Получение слов по user_id
function getWordsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM words WHERE user_id = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
}


function addWord(wordData) {
    return new Promise((resolve, reject) => {
        const { word, translation, next_review_time, user_id } = wordData;
        const stmt = db.prepare('INSERT INTO words (word, translation, next_review_time, user_id, playlist_id) VALUES (?, ?, ?, ?, 0)');  // playlist_id по умолчанию 0
        stmt.run([word, translation, next_review_time, user_id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
        stmt.finalize();
    });
}



// Функция для удаления слова по его ID
function deleteWordById (wordId, userId) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM words WHERE id = ? AND user_id = ?';
        db.run(query, [wordId, userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function updateWordById(wordId, updatedWordData) {
    const { word, translation, user_id } = updatedWordData;
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE words SET word = ?, translation = ? WHERE id = ? AND user_id = ?',
            [word, translation, wordId, user_id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}

export { getWordsByUserId, addWord, deleteWordById, updateWordById };
