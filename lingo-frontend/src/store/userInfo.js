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
                name: 'user-info-store', // name for storage in localStorage
            }
        ),
        { name: 'UserInfoStore' } // name for display in DevTools
    )
);

export default useUserInfo;