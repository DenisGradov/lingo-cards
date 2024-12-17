import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import ua from './locales/ua.json';

i18n.use(initReactI18next).init({
    resources: {
        ua: { translation: ua },
    },
    fallbackLng: false,
    interpolation: {
        escapeValue: false,
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => key,
});

export default i18n;
