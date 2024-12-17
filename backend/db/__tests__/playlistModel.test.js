import { 
    addPlaylist, 
    getPlaylistsByUserId, 
    getPlaylistById, 
    deletePlaylistById, 
    updatePlaylistOpenTime 
} from '../playlistModel.js';
import { db, initDatabase } from '../database.js';

describe('Playlist Model', () => {
    beforeAll(() => {
        initDatabase(); 
    });

    beforeEach(() => {
        db.serialize(() => {
            db.run('DELETE FROM playlists');
        });
    });

    afterAll(() => {
        db.close(); 
    });

    test('should add a playlist successfully', async () => {
        const playlist = await addPlaylist({
            name: 'Test Playlist',
            description: 'Test Description',
            user_id: 1,
            language_code: 'en',
        });

        expect(playlist).toHaveProperty('id');
        expect(playlist.name).toBe('Test Playlist');
        expect(playlist.description).toBe('Test Description');
        expect(playlist.user_id).toBe(1);
        expect(playlist.language_code).toBe('en');
        expect(playlist.last_open_time).toBe(0);
        expect(playlist.number_of_cards).toBe(0);
    });

    test('should throw an error if required fields are missing', async () => {
        await expect(
            addPlaylist({
                description: 'Missing name and user_id',
                language_code: 'en',
            })
        ).rejects.toThrow('Missing required fields: name, user_id');

        await expect(
            addPlaylist({
                name: 'Missing user_id',
                description: 'Test Description',
            })
        ).rejects.toThrow('Missing required fields: user_id');
    });

    test('should throw an error if database fails', async () => {
        const mockRun = jest.spyOn(db, 'run').mockImplementation((query, params, callback) => {
            callback(new Error('Database error'));
        });

        await expect(
            addPlaylist({
                name: 'Test Playlist',
                description: 'Test Description',
                user_id: 1,
                language_code: 'en',
            })
        ).rejects.toThrow('Database error');

        mockRun.mockRestore(); 
    });

    test('should get playlists by user ID', async () => {
        await addPlaylist({
            name: 'User 1 Playlist 1',
            description: 'Description 1',
            user_id: 1,
            language_code: 'en',
        });

        await addPlaylist({
            name: 'User 1 Playlist 2',
            description: 'Description 2',
            user_id: 1,
            language_code: 'es',
        });

        const playlists = await getPlaylistsByUserId(1);

        expect(playlists.length).toBe(2);
        expect(playlists[0].name).toBe('User 1 Playlist 1');
        expect(playlists[1].name).toBe('User 1 Playlist 2');
    });

    test('should get a playlist by ID', async () => {
        const playlist = await addPlaylist({
            name: 'Test Playlist',
            description: 'Test Description',
            user_id: 1,
            language_code: 'en',
        });

        const fetchedPlaylist = await getPlaylistById(playlist.id);

        expect(fetchedPlaylist).toEqual(expect.objectContaining({
            id: playlist.id,
            name: 'Test Playlist',
            description: 'Test Description',
            user_id: 1,
            language_code: 'en',
        }));
    });

    test('should return null if playlist not found by ID', async () => {
        const fetchedPlaylist = await getPlaylistById(999); // Non-existent ID
        expect(fetchedPlaylist).toBeNull();
    });

    test('should delete a playlist by ID', async () => {
        const playlist = await addPlaylist({
            name: 'Playlist to Delete',
            description: 'Test Description',
            user_id: 1,
            language_code: 'en',
        });

        const result = await deletePlaylistById(playlist.id, 1);
        expect(result).toBe(true);

        const playlists = await getPlaylistsByUserId(1);
        expect(playlists.length).toBe(0);
    });

    test('should throw an error when deleting a non-existent playlist', async () => {
        await expect(deletePlaylistById(999, 1)).rejects.toThrow();
    });

    test('should update playlist open time', async () => {
        const playlist = await addPlaylist({
            name: 'Playlist to Update',
            description: 'Test Description',
            user_id: 1,
            language_code: 'en',
        });

        const updated = await updatePlaylistOpenTime(playlist.id);
        expect(updated).toEqual(
            expect.objectContaining({
                message: 'Playlist open time updated',
                last_open_time: expect.any(Number),
            })
        );

        const fetchedPlaylist = await getPlaylistById(playlist.id);
        expect(fetchedPlaylist.last_open_time).toBe(updated.last_open_time);
    });

    test('should throw an error when updating open time for non-existent playlist', async () => {
        await expect(updatePlaylistOpenTime(999)).rejects.toThrow();
    });
});
