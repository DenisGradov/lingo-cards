var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import server from "../../index.js";
import { db, initDatabase } from "../database.js";
import supertest from "supertest";
let request;
let listener;
describe("Integration", () => {
    beforeAll((done) => {
        setTimeout(() => {
            initDatabase();
            done();
        }, 1000);
    });
    beforeEach((done) => {
        setTimeout(() => {
            db.serialize(() => {
                db.run("DELETE FROM playlists", done);
            });
            const listener = server.listen(0, () => {
                const port = listener.address().port;
                request = supertest(`http://localhost:${port}`);
                done();
            });
        }, 1000);
    });
    afterAll((done) => {
        setTimeout(() => {
            server.close(() => {
                db.close(done);
            });
        }, 1000);
    });
    afterEach((done) => {
        setTimeout(() => {
            server.close(() => {
                done();
            });
        }, 1000);
    });
    test("GET /playlists should return all playlists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post("/playlists").send({
            name: "Playlist 1",
            description: "Description 1",
            language_code: "en",
        });
        yield request.post("/playlists").send({
            name: "Playlist 2",
            description: "Description 2",
            language_code: "es",
        });
        const response = yield request.get("/playlists");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty("name", "Playlist 1");
        expect(response.body[1]).toHaveProperty("name", "Playlist 2");
    }));
    test("DELETE /playlists/:id should delete a playlist", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield request.post("/playlists").send({
            name: "Playlist to Delete",
            description: "Description for delete",
            language_code: "en",
        });
        const playlistId = createResponse.body.id;
        const deleteResponse = yield request.delete(`/playlists/${playlistId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty("message", "Playlist deleted successfully");
        const getResponse = yield request.get("/playlists");
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toHaveLength(0);
    }));
});
