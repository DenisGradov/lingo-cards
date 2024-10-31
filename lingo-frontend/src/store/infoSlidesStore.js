import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useInfoSlidesStore = create(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        currentSlide: 0,
        slides: [],

        openSlides: (slides) => set({ isOpen: true, slides, currentSlide: 0 }),

        nextSlide: () =>
          set((state) => {
            return { currentSlide: state.currentSlide + 1 };
          }),

        previousSlide: () =>
          set((state) => ({
            currentSlide: Math.max(state.currentSlide - 1, 0),
          })),

        completeSlides: () => set({ isOpen: false, currentSlide: 0 }),
      }),
      {
        name: 'info-slides-store',
      }
    ),
    { name: 'info-slides-store' }
  )
);

export default useInfoSlidesStore;
