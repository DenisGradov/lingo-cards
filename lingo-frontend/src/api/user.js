export const updateUserName = async (newLogin) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/updateUsername`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newLogin }),
        });

        const data = await response.json();
        if (response.ok) {
            return data; // Возвращаем новый логин
        } else {
            throw new Error(data.error || 'Failed to update username');
        }
    } catch (error) {
        console.error('Ошибка при изменении имени пользователя:', error);
        throw error;  // Прокидываем ошибку для обработки в компоненте
    }
};
