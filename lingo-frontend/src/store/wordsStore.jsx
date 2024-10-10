// wordsStore.js (frontend)
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {addWord as addWordApi, deleteWord, getAllWords} from '../api/words';

const useWordsStore = create(
    devtools(
        persist(
            (set) => ({
                words: [],  // Список всех слов

                // Получение всех слов с сервера
                setWords: async () => {
                    try {
                        const words = await getAllWords();
                        set({ words });
                    } catch (error) {
                        console.error('Ошибка при получении слов:', error);
                    }
                },
                saveWords: (words) => {
                    set({ words });
                },
                // Добавление нового слова и получение актуального списка слов с сервера
                addWord: async (word) => {
                    try {
                        const words = await addWordApi(word); // добавление слова и получение актуального списка
                        set({ words });
                    } catch (error) {
                        console.error('Ошибка при добавлении слова:', error);
                    }
                },

                // Удаление слова по id
                deleteWord: async (wordId) => {
                    try {
                        await deleteWord(wordId);  // удаление слова на бэке
                        const words = await getAllWords();  // обновление списка после удаления
                        set({ words });
                    } catch (error) {
                        console.error('Ошибка при удалении слова:', error);
                    }
                },


            }),
            {
                name: 'words-store', // хранилище в localStorage
            }
        ),
        { name: 'WordsStore' }
    )
);

export default useWordsStore;
