// playlistsStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {createPlaylist, deletePlaylistById, getAllPlaylists, openPlaylist} from '../api/playlists';

const usePlaylistsStore = create(
    devtools(
        persist(
            (set) => ({
                playlists: [],
                isLoading: false,  // Добавляем состояние загрузки
                clearPlaylists: () => set({ playlists: [] }),

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

                deletePlaylist: async (id) => {
                    try {
                        await deletePlaylistById(id);
                        set((state) => ({
                            playlists: state.playlists.filter((playlist) => playlist.id !== id),
                        }));
                    } catch (error) {
                        console.error('Ошибка при удалении плейлиста:', error);
                    }
                },

                openPlaylist: async (id) => {
                    try {
                        const updatedPlaylist = await openPlaylist(id);
                        set((state) => ({
                            playlists: state.playlists.map((playlist) =>
                                playlist.id === id ? { ...playlist, last_open_time: updatedPlaylist.last_open_time } : playlist
                            ),
                        }));
                    } catch (error) {
                        console.error('Ошибка при открытии плейлиста:', error);
                    }
                },
            }),
            { name: 'playlists-store' }
        ),
        { name: 'PlaylistsStore' }
    )
);

export default usePlaylistsStore;
