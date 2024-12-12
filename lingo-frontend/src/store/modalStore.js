import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useModalStore = create(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        contentType: '',
        title: '',
        description: '',
        hasCloseIcon: true,
        buttons: [],
        buttonsWithClose: [],
        inputs: [],
        textareas: [],
        selects: [],
        formButtons: [],
        selectedWord: null,

        openModal: ({
          contentType = '',
          title,
          description,
          hasCloseIcon = true,
          buttons = [],
          buttonsWithClose = [],
          inputs = [],
          textareas = [],
          selects = [],
          formButtons = [],
          selectedWord = null,
        }) => {
          set({
            isOpen: true,
            contentType,
            title,
            description,
            hasCloseIcon,
            buttons,
            buttonsWithClose,
            inputs,
            textareas,
            selects,
            formButtons,
            selectedWord,
          });
        },

        closeModal: () => {
          set({
            isOpen: false,
            contentType: '',
            title: '',
            description: '',
            buttons: [],
            buttonsWithClose: [],
            inputs: [],
            textareas: [],
            selects: [],
            formButtons: [],
            selectedWord: null,
          });
        },
        setSelectedWord: (word) => set({ selectedWord: word }),
        clearSelectedWord: () => set({ selectedWord: null }),
      }),
      {
        name: 'modal-store',
      },
    ),
    { name: 'modal-store' },
  ),
);

export default useModalStore;
