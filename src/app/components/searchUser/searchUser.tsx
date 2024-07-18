import { FC, useEffect, useState } from 'react';

import { sanitizeString, useDebounce } from '../../helpers';

import styles from './searchUser.module.scss';

interface SearchUserProps {
    callback: (text: string) => void;
}

export const SearchUser: FC<SearchUserProps> = ({ callback }) => {
    const [text, setText] = useState('');

    const debouncedText = useDebounce(text, 300);

    useEffect(() => {
        callback(debouncedText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedText]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(sanitizeString(newText));
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Search user..."
                className={styles.searchInput}
            />
        </div>
    );
};