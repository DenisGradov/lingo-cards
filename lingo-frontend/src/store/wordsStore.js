// wordsStore.js (frontend)
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {addWord as addWordApi, deleteWord, editWordApi, getAllWords} from '../api/words';

const useWordsStore = create(
    devtools(
        persist(
            (set) => ({
                words: [],  // Список всех слов
                clearWords: () => set({ words: [] }),

                // Получение всех слов с сервера
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
                        const response = await deleteWord(wordId);  // удаление слова на бэке
                        if (response && typeof (response) === "object") {
                            set({ words: response }); // сохраняем обновленный массив слов
                        } else {
                            console.error('Ответ от API не содержит обновленного списка слов.');
                        }
                    } catch (error) {
                        console.error('Ошибка при удалении слова:', error);
                    }
                },

                editWord: async (id, updatedData) => {
                    try {
                        const response = await editWordApi(id, updatedData); // выполняем запрос к API
                        if (response && typeof (response) === "object") {
                            set({ words: response }); // сохраняем обновленный массив слов
                        } else {
                            console.error('Ответ от API не содержит обновленного списка слов.');
                        }
                    } catch (error) {
                        console.error('Ошибка при редактировании слова:', error);
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
