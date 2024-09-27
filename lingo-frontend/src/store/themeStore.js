import { create } from 'zustand';
import { useEffect } from 'react';

// Создаем zustand хранилище
const useThemeStore = create((set) => ({
    isDark: false,  // Инициализация темы по умолчанию
    setIsDark: (value) => set({ isDark: value }),  // Устанавливаем тему (темная/светлая)
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('isDark', JSON.stringify(newTheme));  // Сохраняем тему в localStorage
        return { isDark: newTheme };
    }),
}));

// Хук для инициализации темы из localStorage
export const useInitializeTheme = () => {
    const setIsDark = useThemeStore((state) => state.setIsDark);

    useEffect(() => {
        const isDarkFromStorage = JSON.parse(localStorage.getItem('isDark'));
        if (isDarkFromStorage !== null) {
            setIsDark(isDarkFromStorage);  // Устанавливаем тему из localStorage
        }
    }, [setIsDark]);
};

export default useThemeStore;
