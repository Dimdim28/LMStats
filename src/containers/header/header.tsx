import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button } from '../../components/button/button';
import { Step } from '../../constants';

import styles from './header.module.scss';

interface HeaderProps {
    setCurrentStep: Dispatch<SetStateAction<Step>>;
    currentStep: Step;
    hidden: boolean;
}
export const Header: FC<HeaderProps> = ({
    setCurrentStep,
    currentStep,
    hidden,
}) => {
    const { t } = useTranslation();
    return (
        <header className={clsx(styles.header, { [styles.hidden]: hidden })}>
            <div className="container line">
                <Button
                    isHighlited={currentStep === 'user'}
                    text={t('userStats')}
                    onClick={() => {
                        setCurrentStep('user');
                    }}
                    buttonClass="buttonBlue"
                />
                <Button
                    isHighlited={currentStep === 'guild'}
                    text={t('guildStats')}
                    onClick={() => {
                        setCurrentStep('guild');
                    }}
                    buttonClass="buttonBlue"
                />
            </div>
        </header>
    );
};
