import useWordsStore from '../store/wordsStore.js';

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
      return data;
    } else {
      throw new Error(data.error || 'Failed to add word');
    }
  } catch (error) {
    console.error('помилка', error);
  }
};

export const getAllWords = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words`, {
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to fetch words');
    }
  } catch (error) {
    console.error('помилка', error);
    throw error;
  }
};

export const deleteWord = async (wordId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/words/${wordId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to delete word');
    }
  } catch (error) {
    console.error('помилка', error);
    throw error;
  }
};

export const findWord = (searchWord) => {
  const words = useWordsStore.getState().words;
  const foundWord = words.find((word) => word.word === searchWord);

  if (foundWord) {
    return foundWord.id;
  } else {
    return false;
  }
};

export const editWordApi = async (wordId, wordData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/words/${wordId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordData),
      },
    );

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to edit word');
    }
  } catch (error) {
    console.error('помилка', error);
  }
};

export const updateWordStage = async (wordId, stage, nextReviewTime) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/words/stage/${wordId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stage, nextReviewTime }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to update word stage');
    }
  } catch (error) {
    console.error('помилка', error);
  }
};
