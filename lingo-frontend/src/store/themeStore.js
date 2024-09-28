import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useThemeStore = create(
    devtools(
        persist(
            (set) => ({
                isDark: false,
                toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
            }),
            {
                name: 'theme-store', // имя для хранения в localStorage
            }
        ),
        { name: 'ThemeStore' } // имя для отображения в DevTools
    )
);

export default useThemeStore