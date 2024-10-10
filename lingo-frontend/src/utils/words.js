export const fetchWords = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words`, {
        credentials: 'include',
    });
    return await response.json();
};

export const fetchPlaylists = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
        credentials: 'include',
    });
    return await response.json();
};

export const addWord = async (word) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    });
    return await response.json();
};

export const addPlaylist = async (playlist) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlist),
    });
    return await response.json();
};

export const updateWord = async (word) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words/${word.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    });
    return await response.json();
};

export const updatePlaylist = async (playlist) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${playlist.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlist),
    });
    return await response.json();
};

export const deleteWord = async (wordId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/words/${wordId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return await response.json();
};

export const deletePlaylist = async (playlistId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${playlistId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return await response.json();
};
