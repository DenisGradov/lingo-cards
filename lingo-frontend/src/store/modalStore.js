// modalStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useModalStore = create(
    devtools(
        persist(
            (set) => ({
                isOpen: false,
                contentType: '',  // тип контента: "playlist" или "word"
                title: '',
                description: '',
                hasCloseIcon: true,
                buttons: [],
                inputs: [],
                textareas: [],
                selects: [],
                formButtons: [],
                selectedWord: null,

                // Открытие модального окна с параметрами, включая contentType
                openModal: ({ contentType = '', title, description, hasCloseIcon = true, buttons = [], inputs = [], textareas = [], selects = [], formButtons = [], selectedWord = null }) => {
                    set({
                        isOpen: true,
                        contentType,
                        title,
                        description,
                        hasCloseIcon,
                        buttons,
                        inputs,
                        textareas,
                        selects,
                        formButtons,
                        selectedWord,
                    });
                },

                // Закрытие модального окна
                closeModal: () => {
                    set({
                        isOpen: false,
                        contentType: '',  // Сброс contentType при закрытии
                        title: '',
                        description: '',
                        buttons: [],
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
                name: 'modal-store',  // хранилище в localStorage
            }
        ),
        { name: 'modal-store' }
    )
);

export default useModalStore;
