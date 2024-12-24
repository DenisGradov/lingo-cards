export function parseCookies(req) {
    const list = {};
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        cookieHeader.split(';').forEach((cookie) => {
            let [name, ...rest] = cookie.split('=');
            name = name.trim();
            const value = rest.join('=').trim();
            if (!value)
                return;
            list[name] = decodeURIComponent(value);
        });
    }
    return list;
}
