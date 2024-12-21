import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Рамп-ап: 10 пользователей за 1 минуту
    { duration: '1m', target: 50 }, // Постоянное навантаження: 50 пользователей
    { duration: '1m', target: 0 },  // Завершение нагрузки
  ],
};

const API_BASE_URL = 'https://api.lingo-cards.pro/api';

export default function () {
  // Регистрация пользователя
  const username = `user_${randomString(5)}`;
  const password = `password123`;
  const registerPayload = JSON.stringify({ username, password });
  let res = http.post(`${API_BASE_URL}/users/register`, registerPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'registration successful': (r) => r.status === 201 });

  // Авторизация пользователя
  const loginPayload = JSON.stringify({ username, password });
  res = http.post(`${API_BASE_URL}/users/login`, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'login successful': (r) => r.status === 200 });
  const token = res.json('token');

  // Получение списка плейлистов
  res = http.get(`${API_BASE_URL}/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(res, { 'fetch playlists': (r) => r.status === 200 });

  // Добавление нового плейлиста
  const playlistPayload = JSON.stringify({ name: `Playlist_${randomString(5)}` });
  res = http.post(`${API_BASE_URL}/playlists`, playlistPayload, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  check(res, { 'create playlist': (r) => r.status === 201 });

  // Получение слов
  res = http.get(`${API_BASE_URL}/words`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(res, { 'fetch words': (r) => r.status === 200 });

  sleep(1); // Ожидание перед следующим циклом
}
