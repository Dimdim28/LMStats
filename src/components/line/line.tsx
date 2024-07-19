import { FC } from 'react';

import styles from './line.module.scss';

interface LineProps {
    text: string;
    value: string;
}
export const Line: FC<LineProps> = ({ text, value }) => {
    return (
        <p className={styles.line}>
            {text}: <span className={styles.value}>{value}</span>
        </p>
    );
};
