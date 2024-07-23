/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Title } from '../../components';
import InfoIcon from '../../components/info-icon/infoIcon';
import LanguageToggler from '../../components/language-toggler/languageToggler';
import { Step } from '../../constants';
import { I18n } from '../../enums/i18n-text';

import styles from './header.module.scss';

interface HeaderProps {
    setCurrentStep: Dispatch<SetStateAction<Step>>;
    currentStep: Step;
    hidden: boolean;
}
export const Header: FC<HeaderProps> = ({
    hidden,
    setCurrentStep,
    currentStep,
}) => {
    const { t } = useTranslation();
    return (
        <header className={clsx(styles.header, { [styles.hidden]: hidden })}>
            <div className="container line">
                {currentStep === 'user' ? (
                    <div onClick={() => setCurrentStep('guild')}>
                        <Title title={`< ${t(I18n.BACK)}`} />
                    </div>
                ) : (
                    <Title title="LMstats" />
                )}

                <div className={styles.header__actionContainer}>
                    <LanguageToggler className={styles.header__toggler} />
                    <InfoIcon onClick={() => {}} />
                </div>
            </div>
        </header>
    );
};
