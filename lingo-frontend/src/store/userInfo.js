import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { countries } from '../constants/mainConstants.js';

const countryCodes = Object.keys(countries);

// Функция для получения следующего языка из списка языков
const getNextLanguage = (currentCode) => {
    const currentIndex = countryCodes.indexOf(currentCode);
    const nextIndex = (currentIndex + 1) % countryCodes.length;
    return countryCodes[nextIndex];
};

// Создаем store для карточек с использованием middleware persist и devtools
export const useCardStore = create(
    devtools(
        persist(
            (set) => ({
                teach: 0,
                iKnow: 0,
                learned: 0,
                // Пример действия для обновления состояния teach
                setTeach: (value) => set({ teach: value }),
            }),
            {
                name: 'card-store', // имя для хранения в localStorage
            }
        ),
        { name: 'CardStore' } // имя для отображения в DevTools
    )
);

// Создаем store для информации о пользователе с использованием middleware persist и devtools
export const useUserInfo = create(
    devtools(
        persist(
            (set, get) => ({
                selectedLanguage: 'ua',
                userName: 'Denys',
                userEmail: 'varonapika@gmail.com',
                changeLanguage: () => {
                    const newLanguageCode = getNextLanguage(get().selectedLanguage);
                    set({ selectedLanguage: newLanguageCode });
                },
                getLanguageInfo: (code) => countries[code],
                setUserName: (name) => set({ userName: name }),
                setUserEmail: (email) => set({ userEmail: email }),
            }),
            {
                name: 'user-info-store', // имя для хранения в localStorage
            }
        ),
        { name: 'UserInfoStore' } // имя для отображения в DevTools
    )
);
