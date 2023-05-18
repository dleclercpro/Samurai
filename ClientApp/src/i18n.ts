import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/translation_en.json';
import de from './locales/translation_de.json';
import fr from './locales/translation_fr.json';
import { Language } from './types/GameTypes';

class i18n {
    private language: string;

    constructor(language: Language) {
        this.language = language;

        i18next.use(initReactI18next)
            .init({
                resources: {
                    en: { translation: en },
                    de: { translation: de },
                    fr: { translation: fr },
                },
                lng: language,
                fallbackLng: Language.EN,
                debug: process.env.NODE_ENV === 'development',
                interpolation: {
                    escapeValue: false,
                },
            });
    }

    getLanguage = () => {
        return this.language;
    }

    getText = (key: string, values?: {}) => {
        let text = i18next.t(key, values);

        if (text === '') {
            text = i18next.t(key, {
                ...values,
                lng: Language.EN,
            });
        }

        return text;
    }
}

export default i18n;