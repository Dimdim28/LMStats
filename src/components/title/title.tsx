import { FC } from 'react';
import clsx from 'clsx';

import styles from './title.module.scss';

interface TitleProps {
    title: string;
    className?: string;
}
export const Title: FC<TitleProps> = ({ title, className = '' }) => {
    return <h1 className={clsx(styles.title, className)}>{title}</h1>;
};
