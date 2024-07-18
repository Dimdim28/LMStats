import { Dispatch, FC, SetStateAction } from 'react';
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
    return (
        <header className={clsx(styles.header, { [styles.hidden]: hidden })}>
            <Button
                isHighlited={currentStep === 'user'}
                text="User`s stats"
                onClick={() => {
                    setCurrentStep('user');
                }}
                buttonClass="buttonBlue"
            />
            <Button
                isHighlited={currentStep === 'guild'}
                text="Guild stats"
                onClick={() => {
                    setCurrentStep('guild');
                }}
                buttonClass="buttonBlue"
            />
        </header>
    );
};
