import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  addWord as addWordApi,
  deleteWord,
  editWordApi,
  getAllWords,
} from '../api/words';
import { updateWordStage as updateWordStageApi } from '../api/words';
import usePlaylistsStore from './playlistsStore.js';
const useWordsStore = create(
  devtools(
    persist(
      (set) => ({
        words: [],
        clearWords: () => set({ words: [] }),

        setWords: async () => {
          try {
            const words = await getAllWords();
            set({ words: Array.isArray(words[0]) ? words.flat() : words });
          } catch (error) {
            console.error('Ошибка при получении слов:', error);
          }
        },
        saveWords: (words) => {
          set({ words });
        },
        addWord: async (word) => {
          try {
            const response = await addWordApi(word);
            if (response && response.words && response.playlists) {
              set({ words: response.words });
              usePlaylistsStore.getState().setPlaylists(response.playlists);
              return response;
            }
          } catch (error) {
            console.error('Ошибка при добавлении слова:', error);
          }
        },

        deleteWord: async (wordId) => {
          try {
            const response = await deleteWord(wordId);
            if (response && response.words && response.playlists) {
              set({ words: response.words });
              usePlaylistsStore.getState().setPlaylists(response.playlists);
            } else {
              console.error('помилка');
            }
          } catch (error) {
            console.error('помилка', error);
          }
        },

        editWord: async (id, updatedData) => {
          try {
            const response = await editWordApi(id, updatedData);
            if (response && response.words && response.playlists) {
              set({ words: response.words });
              usePlaylistsStore.getState().setPlaylists(response.playlists);
              return response;
            } else {
              console.error('помилка');
            }
          } catch (error) {
            console.error('помилка', error);
          }
        },

        updateWordStage: async (wordId, stage, nextReviewTime) => {
          set((state) => ({
            words: state.words.map((word) =>
              word.id === wordId
                ? {
                    ...word,
                    review_stage: stage,
                    next_review_time: nextReviewTime,
                  }
                : word
            ),
          }));
          await updateWordStageApi(wordId, stage, nextReviewTime);
        },
      }),
      {
        name: 'words-store',
      }
    ),
    { name: 'WordsStore' }
  )
);

export default useWordsStore;
