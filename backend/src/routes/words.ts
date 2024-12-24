import { IncomingMessage, ServerResponse } from 'http';
import { parseBody } from '../utils/parseBody.js';
import { getWordsByUserId, addWord, deleteWordById, updateWordStage } from '../db/wordModel.js';

async function handleGetWords(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const userId = Number(req.headers['user-id']); 
    if (isNaN(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid user ID' }));
      return;
    }

    const words = await getWordsByUserId(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(words));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}

async function handleAddWord(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseBody(req);
    const { word, translation, next_review_time, user_id, playlist_id } = JSON.parse(body as string);

    if (typeof next_review_time !== 'number' || isNaN(next_review_time)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid next review time' }));
      return;
    }

    const review_stage = 0;

    const result = await addWord({
      word,
      translation,
      next_review_time,
      user_id,
      playlist_id: playlist_id ?? null,
      review_stage, 
    });

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Word added successfully', id: result.id }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}


async function handleDeleteWord(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseBody(req);
    const { wordId, userId } = JSON.parse(body as string);

    if (typeof wordId !== 'number' || isNaN(wordId) || typeof userId !== 'number' || isNaN(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid word ID or user ID' }));
      return;
    }

    await deleteWordById(wordId, userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Word deleted successfully' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}

async function handleUpdateWordStage(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseBody(req);
    const { wordId, stage, nextReviewTime } = JSON.parse(body as string);

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

    const changes = await updateWordStage(wordId, stage, nextReviewTime);
    if (changes === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Word not found or no changes made' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Word stage updated successfully' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message || 'Internal server error' }));
  }
}

export default function wordsRoutes(req: IncomingMessage, res: ServerResponse): void {
  const pathName = req.url?.split('?')[0];
  const method = req.method;

  if (pathName === '/words' && method === 'GET') {
    handleGetWords(req, res);
  } else if (pathName === '/words' && method === 'POST') {
    handleAddWord(req, res);
  } else if (pathName === '/words' && method === 'DELETE') {
    handleDeleteWord(req, res);
  } else if (pathName === '/words/stage' && method === 'PATCH') {
    handleUpdateWordStage(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
