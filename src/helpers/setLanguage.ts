import { Language } from '../enums/language';
import { LocalStorageKey } from '../enums/storage';

export const setStorageLanguage = (language: Language) => {
    localStorage.setItem(LocalStorageKey.LANG, language);
};
