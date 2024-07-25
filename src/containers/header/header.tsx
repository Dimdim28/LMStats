import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Title } from '../../components';
import CrossIcon from '../../components/crossIcon/crossIcon';
import InfoIcon from '../../components/info-icon/infoIcon';
import LanguageToggler from '../../components/language-toggler/languageToggler';
import { ExcelUser, Step } from '../../constants';
import { I18n } from '../../enums/i18n-text';

import styles from './header.module.scss';

interface HeaderProps {
    setCurrentStep: Dispatch<SetStateAction<Step>>;
    data: ExcelUser[] | null;
    currentStep: Step;
}
export const Header: FC<HeaderProps> = ({
    data,
    currentStep,
    setCurrentStep,
}) => {
    const { t } = useTranslation();

    const handleGoBakc = () => {
        data ? setCurrentStep('guild') : setCurrentStep('upload');
    };
    return (
        <header className={clsx(styles.header)}>
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
                    {currentStep === 'info' ? (
                        <CrossIcon onClick={handleGoBakc} />
                    ) : (
                        <InfoIcon onClick={() => setCurrentStep('info')} />
                    )}
                </div>
            </div>
        </header>
    );
};
