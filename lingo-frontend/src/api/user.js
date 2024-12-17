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
            return data;
        } else {
            throw new Error(data.error || 'Failed to update username');
        }
    } catch (error) {
        console.error('помилка', error);
        throw error;
    }
};

export const signInUser = async (userInfo) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Failed to sign in');
        }
    } catch (error) {
        console.error('помилка', error);
        throw error;
    }
};


export const registerUser = async (userInfo) => {
    try {
        const response = await fetch(`http://localhost:5001/users/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Failed to register');
        }
    } catch (error) {
        console.error('помилка', error);
        throw error;
    }
};
