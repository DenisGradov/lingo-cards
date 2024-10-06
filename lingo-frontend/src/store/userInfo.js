import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { countries } from '../constants/mainConstants.js';

const countryCodes = Object.keys(countries);

// Function to get the next language from the list
const getNextLanguage = (currentCode) => {
    const currentIndex = countryCodes.indexOf(currentCode);
    const nextIndex = (currentIndex + 1) % countryCodes.length;
    return countryCodes[nextIndex];
};

const useUserInfo = create(
    devtools(
        persist(
            (set, get) => ({
                selectedLanguage: 'ua',
                userName: '',
                userEmail: '',
                isAuthenticated: null, // Новый флаг для аутентификации

                changeLanguage: () => {
                    const newLanguageCode = getNextLanguage(get().selectedLanguage);
                    set({ selectedLanguage: newLanguageCode });
                },
                getLanguageInfo: (code) => countries[code],

                setUserName: (name) => set({ userName: name }),
                setUserEmail: (email) => set({ userEmail: email }),
                setIsAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),  // Установка аутентификации

                clearUserInfo: () => {
                    set({
                        userName: '',
                        userEmail: '',
                        isAuthenticated: false, // Сбрасываем аутентификацию
                    });
                }

            }),
            {
                name: 'user-info-store', // имя для хранения в localStorage
            }
        ),
        { name: 'UserInfoStore' } // имя для отображения в DevTools
    )
);

export default useUserInfo;
