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


// Добавление нового слова
function addWord(wordData) {
    return new Promise((resolve, reject) => {
        const { word, translation, next_review_time, user_id } = wordData;
        const stmt = db.prepare('INSERT INTO words (word, translation, next_review_time, user_id) VALUES (?, ?, ?, ?)');
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
};

export { getWordsByUserId, addWord, deleteWordById };
