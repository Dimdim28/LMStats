import { FC } from 'react';

import styles from './userLine.module.scss';

interface UserLineProps {
    name: string;
    value: number;
    onClick: () => void;
}

export const UserLine: FC<UserLineProps> = ({ name, value, onClick }) => {
    const red = value < 50 ? 255 : Math.floor(255 - (value - 50) * 5.1);
    const green = value < 50 ? Math.floor(value * 5.1) : 255;

    return (
        <button className={styles.button} onClick={onClick}>
            <p className={styles.name}>{name}</p>
            <span
                className={styles.value}
                style={{ color: `rgb(${red}, ${green}, 0)` }}
            >
                {value}%
            </span>
        </button>
    );
};
