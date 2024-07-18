import { FC } from 'react';
import clsx from 'clsx';

import styles from './button.module.scss';

interface ButtonProps {
    buttonClass: string;
    text: string;
    onClick: () => void;
    isHighlited?: boolean;
}
export const Button: FC<ButtonProps> = ({
    buttonClass,
    text,
    onClick,
    isHighlited,
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.button, styles[buttonClass], {
                [styles.highlited]: isHighlited,
            })}
        >
            {text}
        </button>
    );
};
