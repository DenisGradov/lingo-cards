import usersRoutes from './users.js';
import wordsRoutes from './words.js';
import playlistsRoutes from './playlists.js';

export function handleRoutes(req, res) {
  const pathName = req.url.split('?')[0]; // Без query параметров

  // Передача маршрутов в зависимости от пути
  if (pathName.startsWith('/users')) {
    return usersRoutes(req, res);
  } else if (pathName.startsWith('/words')) {
    return wordsRoutes(req, res);
  } else if (pathName.startsWith('/playlists')) {
    return playlistsRoutes(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
