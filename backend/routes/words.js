import { getWordsByUserId, addWord, deleteWordById } from '../db/wordModel.js';
import { parseBody } from '../utils/parseBody.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function handleAddWord(req, res) {
    const body = await parseBody(req);
    const { word, translation, next_review_time } = JSON.parse(body);

    const token = req.headers.cookie.split('token=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await addWord({ word, translation, next_review_time, user_id: userId });
    const words = await getWordsByUserId(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Word added successfully', words }));
}

async function handleDeleteWord(req, res, wordId) {
    const token = req.headers.cookie.split('token=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await deleteWordById(wordId, userId);
    const words = await getWordsByUserId(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Word deleted successfully', words }));
}

export default function wordsRoutes(req, res) {
    const pathName = req.url.split('?')[0];
    const method = req.method;

    if (pathName === '/words' && method === 'POST') {
        return handleAddWord(req, res);
    } else if (pathName.startsWith('/words/') && method === 'DELETE') {
        const wordId = pathName.split('/')[2];
        return handleDeleteWord(req, res, wordId);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}
