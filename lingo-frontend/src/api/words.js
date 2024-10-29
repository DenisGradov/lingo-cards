// Запрос для добавления нового слова
import useWordsStore from "../store/wordsStore.js";

export const addWord = async (wordData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordData),
        });

        const data = await response.json();
        if (response.ok) {
            return data.words; // Возвращаем обновленный список слов
        } else {
            throw new Error(data.error || 'Failed to add word');
        }
    } catch (error) {
        console.error('Ошибка при добавлении слова:', error);
    }
};



// Запрос для получения всех слов
export const getAllWords = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words`, {
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            return data; // Возвращаем данные
        } else {
            throw new Error(data.error || 'Failed to fetch words');
        }
    } catch (error) {
        console.error('Ошибка при получении слов:', error);
        throw error; // Выбрасываем ошибку для обработки в месте вызова
    }
};



// Запрос для удаления слова по ID
export const deleteWord = async (wordId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words/${wordId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data.words;  // Возвращаем обновленный список слов
        } else {
            throw new Error(data.error || 'Failed to delete word');
        }
    } catch (error) {
        console.error('Ошибка при удалении слова:', error);
        throw error;
    }
};


// Функция для поиска слова по слову и возврата его ID, если найдено
export const findWord = (searchWord) => {
    const words = useWordsStore.getState().words;  // Получаем слова из состояния
    const foundWord = words.find((word) => word.word === searchWord);  // Ищем слово

    if (foundWord) {
        return foundWord.id;  // Возвращаем id первого найденного слова
    } else {
        return false;  // Если слово не найдено
    }
};

// Запрос для редактирования слова по ID
export const editWordApi = async (wordId, wordData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words/${wordId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordData),
        });

        const data = await response.json();
        if (response.ok) {
            return data.words; // Возвращаем обновленный список слов
        } else {
            throw new Error(data.error || 'Failed to edit word');
        }
    } catch (error) {
        console.error('Ошибка при редактировании слова:', error);
    }
};


// Обновляем стадию и время появления для слова
export const updateWordStage = async (wordId, stage, nextReviewTime) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words/stage/${wordId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stage, nextReviewTime }),
        });

        if (!response.ok) {
            throw new Error('Failed to update word stage');
        }
    } catch (error) {
        console.error('Ошибка при обновлении стадии слова:', error);
    }
};
