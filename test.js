import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, 
    { duration: '30s', target: 50 }, 
    { duration: '10s', target: 0 },  
  ],
};

const BASE_URL = 'http://localhost:5001';

function generateUniqueId() {
  const timestamp = Date.now(); 
  const random = Math.floor(Math.random() * 100000); 
  return `${timestamp}_${random}`;
}

export default function () {
  const uniqueId = generateUniqueId();

  let registerPayload = JSON.stringify({
    login: `testuser_${uniqueId}`,
    email: `testuser_${uniqueId}@example.com`,
    password: 'password123',
  });

  let registerRes = http.post(`${BASE_URL}/users/register`, registerPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(registerRes, {
    'Register: status is 201': (r) => r.status === 201,
  });

  let token = '';
  if (registerRes.status === 201) {
    token = registerRes.json('token');
  }

  let loginPayload = JSON.stringify({
    login: `testuser_${uniqueId}`,
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
    let checkAuthRes = http.get(`${BASE_URL}/users/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(checkAuthRes, {
      'Check Auth: status is 200': (r) => r.status === 200,
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
