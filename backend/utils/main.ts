import { IncomingMessage } from 'http';

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const list: Record<string, string> = {};
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      let [name, ...rest] = cookie.split('=');
      name = name.trim();
      const value = rest.join('=').trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
  }
  return list;
}
