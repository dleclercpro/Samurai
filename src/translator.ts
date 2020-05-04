import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/translation_en.json';
import de from './locales/translation_de.json';
import fr from './locales/translation_fr.json';

class Translator {

    private language: string;

    constructor() {
        this.language = '';
    }
    
    init = (language: string) => {
        this.language = language;

        i18next.use(initReactI18next)
            .init({
                resources: {
                    en: { translation: en },
                    de: { translation: de },
                    fr: { translation: fr },
                },
                lng: language,
                fallbackLng: 'en',
                debug: true,
                interpolation: {
                    escapeValue: false,
                },
            });
    }

    setLanguage = (language: string) => {
        this.language = language;

        i18next.changeLanguage(language);
    }

    getLanguage = () => {
        return this.language;
    }

    getText = (key: string, values?: {}) => {
        let text = i18next.t(key, values);

        if (text === '') {
            text = i18next.t(key, {
                ...values,
                lng: 'en',
            });
        }

        return text;
    }
}

export default new Translator();