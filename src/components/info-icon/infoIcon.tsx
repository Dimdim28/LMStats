import { FC } from 'react';
import clsx from 'clsx';

import styles from './infoIcon.module.scss';
type InfoIconProps = {
    width?: number;
    height?: number;
    onClick: () => void;
    className?: string;
};
const InfoIcon: FC<InfoIconProps> = ({
    width = 25,
    height = 25,
    onClick,
    className = '',
}) => {
    return (
        <svg
            className={clsx(styles.icon, className)}
            onClick={onClick}
            width={`${width}`}
            height={`${height}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_120_2)">
                <circle cx="12" cy="12" r="12" />
                <rect
                    x="10"
                    y="10"
                    width="4"
                    height="10"
                    rx="1"
                    fill="#8C3A49"
                />
                <rect x="10" y="4" width="4" height="4" rx="1" fill="#8C3A49" />
            </g>
            <defs>
                <clipPath id="clip0_120_2">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default InfoIcon;
