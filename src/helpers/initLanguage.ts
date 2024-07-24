import { Language } from '../enums/language';
import { LocalStorageKey } from '../enums/storage';

export const initLanguage = () => {
    const language = localStorage.getItem(LocalStorageKey.LANG);
    if (!language) {
        localStorage.setItem(LocalStorageKey.LANG, Language.EN);
    }
};
