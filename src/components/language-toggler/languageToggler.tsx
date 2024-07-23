import { FC, useContext } from 'react';
import clsx from 'clsx';

import {
    LanguageContext,
    LanguageContextType,
} from '../../context/languageContext';

import styles from './languageToggler.module.scss';
type LanguageTogglerProps = {
    className?: string;
};

const LanguageToggler: FC<LanguageTogglerProps> = ({ className = '' }) => {
    const { language, setLanguage } = useContext(
        LanguageContext,
    ) as LanguageContextType;
    return (
        <div onClick={setLanguage} className={clsx(styles.toggler, className)}>
            {language.toUpperCase()}
        </div>
    );
};

export default LanguageToggler;
