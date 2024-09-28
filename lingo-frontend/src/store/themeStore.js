import { create } from 'zustand';

const useThemeStore = create((set) => ({
    isDark: (() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const storedValue = localStorage.getItem('isDark');
                return storedValue ? JSON.parse(storedValue) : false;
            } catch (error) {
                console.error(`Error reading localStorage key "isDark":`, error);
                return false;  // Если произошла ошибка, возвращаем значение по умолчанию
            }
        }
        return false;  // Значение по умолчанию, если localStorage недоступен
    })(),
    toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('isDark', JSON.stringify(newTheme));
            } catch (error) {
                console.error(`Error setting localStorage key "isDark":`, error);
            }
        }
        return { isDark: newTheme };
    }),
}));

export default useThemeStore;
