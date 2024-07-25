import { FC } from 'react';
import clsx from 'clsx';

import styles from './crossIcon.module.scss';

type CrossIconProps = {
    width?: number;
    height?: number;
    onClick: () => void;
    className?: string;
};

const CrossIcon: FC<CrossIconProps> = ({
    width = 24,
    height = 24,
    onClick,
    className = '',
}) => {
    return (
        <svg
            className={clsx(styles.icon, className)}
            onClick={onClick}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="12" />
            <line
                x1="17.5732"
                y1="6.26354"
                x2="6.44832"
                y2="17.763"
                stroke="#8C3A49"
                strokeWidth="2"
            />
            <line
                x1="17.7613"
                y1="17.55"
                x2="6.23791"
                y2="6.44998"
                stroke="#8C3A49"
                strokeWidth="2"
            />
        </svg>
    );
};

export default CrossIcon;
