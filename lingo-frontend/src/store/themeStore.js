import { create } from 'zustand';

const useThemeStore = create((set) => ({
    isDark: JSON.parse(localStorage.getItem('isDark')) || false,
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('isDark', JSON.stringify(newTheme));
        return { isDark: newTheme };
    }),
}));

export default useThemeStore;
