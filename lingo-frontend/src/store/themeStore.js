import { create } from 'zustand';

const useThemeStore = create((set) => ({
    isDark: JSON.parse(localStorage.getItem('isDark')) || false,  // Чтение темы из localStorage
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('isDark', JSON.stringify(newTheme));  // Сохраняем тему в localStorage
        return { isDark: newTheme };
    }),
}));

export default useThemeStore;
