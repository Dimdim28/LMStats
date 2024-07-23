import { createContext, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Language } from '../enums/language';
import { LocalStorageKey } from '../enums/storage';
import { setStorageLanguage } from '../helpers/setLanguage';

export type LanguageContextType = {
    language: Language;
    setLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
    children: ReactNode;
};
const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(
        (localStorage.getItem(LocalStorageKey.LANG) as Language) || Language.EN,
    );
    const { i18n } = useTranslation();

    const setNewLanguage = () => {
        const newLang = language === Language.EN ? Language.RU : Language.EN;

        setLanguage(newLang);
        setStorageLanguage(newLang);
        void i18n.changeLanguage(newLang);
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage: setNewLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
