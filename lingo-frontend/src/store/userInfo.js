import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { countries } from '../constants/mainConstants.js';

const countryCodes = Object.keys(countries);

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
                isAuthenticated: null,

                changeLanguage: () => {
                    const newLanguageCode = getNextLanguage(get().selectedLanguage);
                    set({ selectedLanguage: newLanguageCode });
                },
                getLanguageInfo: (code) => countries[code],

                setUserName: (name) => set({ userName: name }),
                setUserEmail: (email) => set({ userEmail: email }),
                setIsAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),

                clearUserInfo: () => {
                    set({
                        userName: '',
                        userEmail: '',
                        isAuthenticated: false,
                    });
                }

            }),
            {
                name: 'user-info-store',
            }
        ),
        { name: 'UserInfoStore' }
    )
);

export default useUserInfo;
