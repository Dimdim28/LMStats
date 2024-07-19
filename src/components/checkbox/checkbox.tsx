import { Dispatch, FC, SetStateAction } from 'react';

import styles from './checkbox.module.scss';

interface CheckBoxProps {
    text: string;
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}
export const Checkbox: FC<CheckBoxProps> = ({
    text,
    isActive,
    setIsActive,
}) => {
    return (
        <label className={styles.container}>
            {text}
            <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((isActive) => !isActive)}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};
