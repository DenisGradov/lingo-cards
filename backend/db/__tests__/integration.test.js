import { server } from "../../index.js";
import { db, initDatabase } from "../database.js";
import supertest from "supertest";

let request = supertest("http://localhost:5001");

describe("Integration", () => {
  beforeAll((done) => {
    initDatabase();
    const listener = server.listen(() => {
      const { port } = listener.address();
      request = supertest(`http://localhost:${port}`);
      done();
    });
  });

  beforeEach(() => {
    db.serialize(() => {
      db.run("DELETE FROM playlists");
    });
  });

  afterAll(() => {
    server.close();
    db.close();
  });

  test("POST /playlists should create a new playlist", async () => {
    const response = await request.post("/playlists").send({
      name: "Test Playlist",
      description: "This is a test playlist",
      language_code: "en",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Playlist");
    expect(response.body.description).toBe("This is a test playlist");
  });

  test("GET /playlists should return all playlists", async () => {
    await request.post("/playlists").send({
      name: "Playlist 1",
      description: "Description 1",
      language_code: "en",
    });

    await request.post("/playlists").send({
      name: "Playlist 2",
      description: "Description 2",
      language_code: "es",
    });

    const response = await request.get("/playlists");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("name", "Playlist 1");
    expect(response.body[1]).toHaveProperty("name", "Playlist 2");
  });

  test("DELETE /playlists/:id should delete a playlist", async () => {
    const createResponse = await request.post("/playlists").send({
      name: "Playlist to Delete",
      description: "Description for delete",
      language_code: "en",
    });

    const playlistId = createResponse.body.id;

    const deleteResponse = await request.delete(`/playlists/${playlistId}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      "Playlist deleted successfully"
    );

    const getResponse = await request.get("/playlists");
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(0);
  });
});
