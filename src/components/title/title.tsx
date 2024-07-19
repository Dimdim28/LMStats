import { FC } from 'react';

import styles from './title.module.scss';

interface TitleProps {
    title: string;
}
export const Title: FC<TitleProps> = ({ title }) => {
    return <h1 className={styles.title}>{title}</h1>;
};
