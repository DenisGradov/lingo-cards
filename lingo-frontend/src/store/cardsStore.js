import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useCardStore = create(
  devtools(
    persist(
      (set) => ({
        setTeach: (value) => set({ teach: value }),
      }),
      {
        name: 'card-store', // name for storage in localStorage
      }
    ),
    { name: 'CardStore' } // name for display in DevTools
  )
);

export default useCardStore;
