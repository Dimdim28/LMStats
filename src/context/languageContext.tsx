import { createContext, ReactNode, useState } from 'react';

import { Language } from '../enums/language';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
    children: ReactNode;
};
const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(Language.EN);

    const setNewLanguage = (lang: Language) => {
        setLanguage(lang);
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
