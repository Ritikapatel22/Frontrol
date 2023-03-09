import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    backend: {
        // loadPath: '/static/app/static(locales/{{lng}}/{{ns}}.json',
        loadPath: '/assests/i18n/{{ns}}/{{lng}}.json',
    },
    fallbackLng: 'en',
    debug: true,
    ns: [ "label" , "message", "grid" ],
    interpolation: {
        escapeValue: false,
        formatSeparator: ",",
    },
    react: {
        bindI18n:"languageChanged",
        // bindI18nStore: 'added',
        // useSuspense: true,
      },
  
});

export default i18n;