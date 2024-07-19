import { FC, useEffect, useState } from 'react';

import styles from './progress.module.scss';

interface ProgressProps {
    value: number;
}

export const Progress: FC<ProgressProps> = ({ value }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress((progress) =>
                progress >= value - 1 ? value : progress + 1,
            );
        }, 30);
        return () => clearTimeout(timeout);
    }, [progress, value]);

    const progressWithEdge = progress < 100 ? progress : 100;
    const red = progress < 50 ? 255 : Math.floor(255 - (progress - 50) * 5.1);
    const green = progress < 50 ? Math.floor(progress * 5.1) : 255;

    return (
        <div className={styles.container}>
            <svg
                className={styles.circle}
                width="120"
                height="120"
                viewBox="0 0 120 120"
            >
                <circle className={styles.bg} cx="60" cy="60" r="50"></circle>
                <circle
                    className={styles.bar}
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={`rgb(${red}, ${green}, 0)`}
                    strokeDashoffset={
                        circumference * (1 - progressWithEdge / 100)
                    }
                ></circle>
            </svg>
            <div className={styles.text} id="progress-text">
                {progress}%
            </div>
        </div>
    );
};
