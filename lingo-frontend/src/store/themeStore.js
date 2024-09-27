import { create } from 'zustand';

const useThemeStore = create((set) => ({
    isDark: false,  // Инициализация темы по умолчанию
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('isDark', JSON.stringify(newTheme));  // Сохраняем тему в localStorage
        return { isDark: newTheme };
    }),
}));

export default useThemeStore;
