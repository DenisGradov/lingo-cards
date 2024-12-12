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
        name: 'theme-store',
      },
    ),
    { name: 'ThemeStore' },
  ),
);

export default useThemeStore;
