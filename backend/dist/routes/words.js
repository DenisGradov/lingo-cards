var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseBody } from '../utils/parseBody.js';
import { getWordsByUserId, addWord, deleteWordById, updateWordStage } from '../db/wordModel.js';
function handleGetWords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.headers['user-id']);
            if (isNaN(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid user ID' }));
                return;
            }
            const words = yield getWordsByUserId(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(words));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
function handleAddWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield parseBody(req);
            const { word, translation, next_review_time, user_id, playlist_id } = JSON.parse(body);
            if (typeof next_review_time !== 'number' || isNaN(next_review_time)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid next review time' }));
                return;
            }
            const review_stage = 0;
            const result = yield addWord({
                word,
                translation,
                next_review_time,
                user_id,
                playlist_id: playlist_id !== null && playlist_id !== void 0 ? playlist_id : null,
                review_stage,
            });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Word added successfully', id: result.id }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
function handleDeleteWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield parseBody(req);
            const { wordId, userId } = JSON.parse(body);
            if (typeof wordId !== 'number' || isNaN(wordId) || typeof userId !== 'number' || isNaN(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid word ID or user ID' }));
                return;
            }
            yield deleteWordById(wordId, userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Word deleted successfully' }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
function handleUpdateWordStage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield parseBody(req);
            const { wordId, stage, nextReviewTime } = JSON.parse(body);
            if (typeof wordId !== 'number' || isNaN(wordId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid word ID' }));
                return;
            }
            if (typeof stage !== 'number' || isNaN(stage)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid stage' }));
                return;
            }
            if (typeof nextReviewTime !== 'number' || isNaN(nextReviewTime)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid next review time' }));
                return;
            }
            const changes = yield updateWordStage(wordId, stage, nextReviewTime);
            if (changes === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Word not found or no changes made' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Word stage updated successfully' }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
    });
}
export default function wordsRoutes(req, res) {
    var _a;
    const pathName = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0];
    const method = req.method;
    if (pathName === '/words' && method === 'GET') {
        handleGetWords(req, res);
    }
    else if (pathName === '/words' && method === 'POST') {
        handleAddWord(req, res);
    }
    else if (pathName === '/words' && method === 'DELETE') {
        handleDeleteWord(req, res);
    }
    else if (pathName === '/words/stage' && method === 'PATCH') {
        handleUpdateWordStage(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}
