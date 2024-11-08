// Запрос для получения всех плейлистов
export const getAllPlaylists = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            return data; // Возвращаем данные
        } else {
            throw new Error(data.error || 'Failed to fetch playlists');
        }
    } catch (error) {
        console.error('Ошибка при получении плейлистов:', error);
        throw error;
    }
};

// Запрос для получения плейлиста по id
export const getPlaylistById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${id}`, {
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            return data; // Возвращаем данные
        } else {
            throw new Error(data.error || 'Failed to fetch playlist');
        }
    } catch (error) {
        console.error(`Ошибка при получении плейлиста по id: ${id}`, error);
        throw error;
    }
};

// Запрос для создания нового плейлиста
export const createPlaylist = async (playlistData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData),
        });

        const data = await response.json();
        if (response.ok) {
            return data; // Возвращаем новый плейлист
        } else {
            throw new Error(data.error || 'Failed to create playlist');
        }
    } catch (error) {
        console.error('Ошибка при создании плейлиста:', error);
        throw error;
    }
};

// Запрос для удаления плейлиста
export const deletePlaylistById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            return true; // Успешное удаление
        } else {
            throw new Error('Failed to delete playlist');
        }
    } catch (error) {
        console.error(`Ошибка при удалении плейлиста по id: ${id}`, error);
        throw error;
    }
};

// Запрос для "открытия" плейлиста, обновляя его last_open_time
export const openPlaylist = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/open/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Failed to open playlist');
        }
    } catch (error) {
        console.error(`Ошибка при открытии плейлиста по id: ${id}`, error);
        throw error;
    }
};
