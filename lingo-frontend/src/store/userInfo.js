import { create } from 'zustand';
import { getItem, setItem } from '../utils/localStorage';
import {countries} from "../constants/mainConstants.js";

const countryCodes = Object.keys(countries);
//get next language buy list of languages
const getNextLanguage = (currentCode) => {
    const currentIndex = countryCodes.indexOf(currentCode);
    const nextIndex = (currentIndex + 1) % countryCodes.length;
    return countryCodes[nextIndex];
};

export const useCardStore = create((set) => ({
    teach: getItem('teach', 0),
    iKnow: getItem('iKnow', 0),
    learned: getItem('learned', 0),
}));
export const userInfo = create((set) => ({
    selectedLanguage: getItem('selectedLanguage', 'ua'),
    userName: getItem('userName', 'Denys'),
    userEmail: getItem('userEmail', 'varonapika@gmail.com'),
    changeLanguage: () => set((state) => {
        const newLanguageCode = getNextLanguage(state.selectedLanguage);
        setItem('selectedLanguage', newLanguageCode); // Сохраняем новый язык в локальном хранилище
        return { selectedLanguage: newLanguageCode };
    }),
    getLanguageInfo: (code) => countries[code],
}));

