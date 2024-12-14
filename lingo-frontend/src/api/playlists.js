// API для работы с mock-данными (плейлисты)

export const getAllPlaylists = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
        credentials: 'include',
      });
  
      const data = await response.json();
      if (response.ok) {
        return data; // Возвращаем список плейлистов из mock-данных
      } else {
        throw new Error(data.error || 'Failed to fetch playlists');
      }
    } catch (error) {
      console.error('Ошибка при получении плейлистов:', error);
      throw error;
    }
  };
  
  export const getPlaylistById = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${id}`, {
        credentials: 'include',
      });
  
      const data = await response.json();
      if (response.ok) {
        return data; // Возвращаем данные конкретного плейлиста
      } else {
        throw new Error(data.error || 'Failed to fetch playlist');
      }
    } catch (error) {
      console.error(`Ошибка при получении плейлиста с ID: ${id}`, error);
      throw error;
    }
  };
  
  export const createPlaylist = async (playlistData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData), // Данные нового плейлиста
      });
  
      const data = await response.json();
      if (response.ok) {
        return data; // Возвращаем созданный плейлист
      } else {
        throw new Error(data.error || 'Failed to create playlist');
      }
    } catch (error) {
      console.error('Ошибка при создании плейлиста:', error);
      throw error;
    }
  };
  
  export const deletePlaylistById = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        return true; // Удаление прошло успешно
      } else {
        throw new Error('Failed to delete playlist');
      }
    } catch (error) {
      console.error(`Ошибка при удалении плейлиста с ID: ${id}`, error);
      throw error;
    }
  };
  
  export const openPlaylist = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/playlists/open/${id}`, {
        method: 'PUT',
        credentials: 'include',
      });
  
      const data = await response.json();
      if (response.ok) {
        return data; // Возвращаем обновлённые данные плейлиста
      } else {
        throw new Error(data.error || 'Failed to open playlist');
      }
    } catch (error) {
      console.error(`Ошибка при открытии плейлиста с ID: ${id}`, error);
      throw error;
    }
  };
  