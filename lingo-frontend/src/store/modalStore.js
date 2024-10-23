// modalStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useModalStore = create(
    devtools(
        persist(
            (set) => ({
                isOpen: false,
                title: '',
                description: '',
                hasCloseIcon: true,
                buttons: [],
                inputs:[],
                textareas:[],
                selects:[],
                formButtons:[],

                // Открытие модального окна с параметрами
                openModal: ({ title, description, hasCloseIcon = true, buttons = [],inputs=[],textareas=[],selects=[],formButtons=[] }) => {
                    set({
                        isOpen: true,
                        title,
                        description,
                        hasCloseIcon,
                        buttons,
                        inputs,
                        textareas,
                        selects,
                        formButtons,
                    });
                },

                // Закрытие модального окна
                closeModal: () => {
                    set({
                        isOpen: false,
                        title: '',
                        description: '',
                        buttons: [],
                        inputs:[],
                        textareas:[],
                        selects:[],
                        formButtons:[],
                    });
                },
            }),
            {
                name: 'modal-store', // хранилище в localStorage
            }
        ),
        { name: 'modal-store' }
    )
);

export default useModalStore;
