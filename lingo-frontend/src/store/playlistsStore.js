// playlistsStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createPlaylist, deletePlaylistById, getAllPlaylists } from '../api/playlists';

const usePlaylistsStore = create(
    devtools(
        persist(
            (set) => ({
                playlists: [],
                isLoading: false,  // Добавляем состояние загрузки

                clearPlaylists: () => set({ playlists: [] }),

                // Функция для получения плейлистов с индикатором загрузки
                setPlaylists: async () => {
                    set({ isLoading: true });
                    try {
                        const playlists = await getAllPlaylists();
                        set({ playlists });
                    } catch (error) {
                        console.error('Ошибка при получении плейлистов:', error);
                    } finally {
                        set({ isLoading: false });
                    }
                },

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
            { name: 'playlists-store' }
        ),
        { name: 'PlaylistsStore' }
    )
);

export default usePlaylistsStore;
