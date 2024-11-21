import {
  getWordsByUserId,
  addWord,
  deleteWordById,
  updateWordById,
  updateWordStage,
} from '../db/wordModel.js';
import { parseBody } from '../utils/parseBody.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPlaylistsByUserId } from '../db/database.js';

dotenv.config();

async function handleAddWord(req, res) {
  const body = await parseBody(req);
  const { word, translation, next_review_time, playlistId } = JSON.parse(body);

  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const playlists = await getPlaylistsByUserId(userId);
  await addWord({
    word,
    translation,
    next_review_time,
    user_id: userId,
    playlist_id: playlistId || null,
  });
  const words = await getWordsByUserId(userId);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({ message: 'Word added successfully', words, playlists }),
  );
}

async function handleDeleteWord(req, res, wordId) {
  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  await deleteWordById(wordId, userId);
  const words = await getWordsByUserId(userId);
  const playlists = await getPlaylistsByUserId(userId);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({ message: 'Word deleted successfully', words, playlists }),
  );
}

async function handleEditWord(req, res, wordId) {
  const body = await parseBody(req);
  const { word, translation, playlistId } = JSON.parse(body);
  const token = req.headers.cookie.split('token=')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  await updateWordById(wordId, {
    word,
    translation,
    user_id: userId,
    playlistId,
  });
  const words = await getWordsByUserId(userId);
  const playlists = await getPlaylistsByUserId(userId);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({ message: 'Word updated successfully', words, playlists }),
  );
}

async function handleUpdateWordStage(req, res, wordId) {
  const body = await parseBody(req);
  const { stage, nextReviewTime } = JSON.parse(body);
  await updateWordStage(wordId, stage, nextReviewTime);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Word stage updated successfully' }));
}

export default function wordsRoutes(req, res) {
  const pathName = req.url.split('?')[0];
  const method = req.method;

  if (pathName === '/words' && method === 'POST') {
    return handleAddWord(req, res);
  } else if (pathName.startsWith('/words/') && method === 'DELETE') {
    const wordId = pathName.split('/')[2];
    return handleDeleteWord(req, res, wordId);
  } else if (pathName.startsWith('/words/stage/') && method === 'PUT') {
    const wordId = pathName.split('/')[3];
    return handleUpdateWordStage(req, res, wordId);
  } else if (pathName.startsWith('/words/') && method === 'PUT') {
    const wordId = pathName.split('/')[2];
    return handleEditWord(req, res, wordId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
