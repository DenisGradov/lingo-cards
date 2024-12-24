import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

const BASE_URL = 'https://api.lingo-cards.pro';
let uniqueId = 0;

export default function () {
  uniqueId++;

  let registerPayload = JSON.stringify({
    login: `testuser_${__VU}_${uniqueId}`,
    email: `testuser_${__VU}_${uniqueId}@example.com`,
    password: 'password123',
  });

  let registerRes = http.post(`${BASE_URL}/users/register`, registerPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(registerRes, {
    'Register: status is 200': (r) => r.status === 200,
  });

  let token = '';
  if (registerRes.status === 200) {
    token = registerRes.json('user.token');
  }

  let loginPayload = JSON.stringify({
    login: `testuser_${__VU}_${uniqueId}`,
    password: 'password123',
  });

  let loginRes = http.post(`${BASE_URL}/users/login`, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'Login: status is 200': (r) => r.status === 200,
  });

  if (loginRes.status === 200) {
    token = loginRes.json('token');
  }

  if (token) {
    let profileRes = http.get(`${BASE_URL}/users/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(profileRes, {
      'Get Profile: status is 200': (r) => r.status === 200,
    });
  }

  if (token) {
    let playlistsRes = http.get(`${BASE_URL}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(playlistsRes, {
      'Get Playlists: status is 200': (r) => r.status === 200,
    });
  }

  if (token) {
    let wordsRes = http.get(`${BASE_URL}/words`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(wordsRes, {
      'Get Words: status is 200': (r) => r.status === 200,
    });
  }

  sleep(1);
}