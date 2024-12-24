import {
    addPlaylist,
    getPlaylistsByUserId,
    getPlaylistById,
    deletePlaylistById,
    updatePlaylistOpenTime,
  } from '../playlistModel.js';
  import { db, initDatabase } from '../database.js';
  import jest from 'jest-mock';
  
  describe('Playlist Model', () => {
    beforeAll(async () => {
      await initDatabase(); 
    });
  
    beforeEach((done) => {
      db.serialize(() => {
        db.run('DELETE FROM playlists', done); 
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
        } as any)
      ).rejects.toThrow('Missing required fields: name, user_id');
  
      await expect(
        addPlaylist({
          name: 'Missing user_id',
          description: 'Test Description',
          language_code: 'en',
        } as any)
      ).rejects.toThrow('Missing required fields: user_id');
    });
  
    test('should throw an error if database fails', async () => {
      const mockRun = jest.spyOn(db, 'run').mockImplementation((query, params, callback) => {
        callback(new Error('Database error'));
        return db;
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
      expect(fetchedPlaylist!).toEqual(
        expect.objectContaining({
          id: playlist.id,
          name: 'Test Playlist',
          description: 'Test Description',
          user_id: 1,
          language_code: 'en',
        })
      );
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
  });
  