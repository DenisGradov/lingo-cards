import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {createPlaylist, deletePlaylistById, getAllPlaylists, getPlaylistById} from '../api/playlists';

const usePlaylistsStore = create(
    devtools(
        persist(
            (set) => ({
                playlists: [],  // Список всех плейлистов

                // Получение всех плейлистов
                setPlaylists: async () => {
                    try {
                        const playlists = await getAllPlaylists();
                        set({ playlists });
                    } catch (error) {
                        console.error('Ошибка при получении плейлистов:', error);
                    }
                },
                savePlaylists: (playlists) => {
                    set({ playlists });
                },
                // Получение плейлиста по id
                getPlaylist: async (id) => {
                    try {
                        return await getPlaylistById(id);
                    } catch (error) {
                        console.error('Ошибка при получении плейлиста:', error);
                    }
                },

                // Создание нового плейлиста
                addPlaylist: async (playlistData) => {
                    try {
                        const newPlaylist = await createPlaylist(playlistData);
                        set((state) => ({
                            playlists: [...state.playlists, newPlaylist],
                        }));
                    } catch (error) {
                        console.error('Ошибка при добавлении плейлиста:', error);
                    }
                },

                // Удаление плейлиста по id
                removePlaylist: async (id) => {
                    try {
                        await deletePlaylistById(id);
                        set((state) => ({
                            playlists: state.playlists.filter((playlist) => playlist.id !== id),
                        }));
                    } catch (error) {
                        console.error('Ошибка при удалении плейлиста:', error);
                    }
                },
            }),
            {
                name: 'playlists-store', // хранилище в localStorage
            }
        ),
        { name: 'PlaylistsStore' }
    )
);

export default usePlaylistsStore;
