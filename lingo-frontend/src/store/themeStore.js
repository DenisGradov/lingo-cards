import { create } from 'zustand';
import { getItem, setItem } from '../utils/localStorage';

const useThemeStore = create((set) => ({
    isDark: getItem('isDark', false),
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        setItem('isDark', newTheme);
        return { isDark: newTheme };
    }),
}));

export default useThemeStore;
