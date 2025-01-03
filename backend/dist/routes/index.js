var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import usersRoutes from './users.js';
import wordsRoutes from './words.js';
import playlistsRoutes from './playlists.js';
export function handleRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const pathName = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) || '';
        if (pathName.startsWith('/users')) {
            yield usersRoutes(req, res);
        }
        else if (pathName.startsWith('/words')) {
            yield wordsRoutes(req, res);
        }
        else if (pathName.startsWith('/playlists')) {
            yield playlistsRoutes(req, res);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
}
