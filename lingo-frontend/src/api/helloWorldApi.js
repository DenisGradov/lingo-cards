import apiClient from './apiClient';

export const fetchHelloWorld = async () => {
    try {
        const response = await apiClient.get('/helloworld');
        return response.data;
    } catch (error) {
        console.error('Error fetching Hello World:', error);
        throw error;
    }
};
