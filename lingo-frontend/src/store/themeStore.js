import { create } from 'zustand';
import { useEffect } from 'react';

const useThemeStore = create((set) => ({
    isDark: false,  // По умолчанию false, так как на сервере localStorage недоступен
    toggleTheme: ()=> set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('isDark', JSON.stringify(newTheme));
        return { isDark: newTheme };
    }),
}));

export const useInitializeTheme = () => {
    const setIsDark = useThemeStore((state) => state.toggleTheme);

    useEffect(() => {
        const isDarkFromStorage = JSON.parse(localStorage.getItem('isDark'));
        if (isDarkFromStorage !== null) {
            setIsDark(isDarkFromStorage); // Инициализируем тему с localStorage
        }
    }, [setIsDark]);
};

export default useThemeStore;
