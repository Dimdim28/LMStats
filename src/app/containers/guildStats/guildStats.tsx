import { FC, useState } from 'react';

import { Button, Checkbox, SearchUser, UserLine } from '../../components';
import { ExcelUser, SortingTabType } from '../../constants';
import {
    filterUsersByName,
    getPercentValue,
    getSortedData,
    getStatValue,
} from '../../helpers';

import styles from './guildStats.module.scss';

interface GuildStatsProps {
    data: ExcelUser[] | null;
    onClickUser: (userName: string) => void;
}

export const GuildStats: FC<GuildStatsProps> = ({ data, onClickUser }) => {
    const [activeTab, setActiveTab] = useState<SortingTabType>('Hunt');
    const [fullInfoToCopy, setFullInfoToCopy] = useState(false);
    const [searchText, setSearchText] = useState('');

    return (
        <div>
            <SearchUser callback={(text) => setSearchText(text)} />
            <div className={styles.buttons}>
                <Button
                    buttonClass={
                        activeTab === 'Hunt' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('Hunt');
                    }}
                    text="Hunt"
                />
                <Button
                    buttonClass={
                        activeTab === 'Purchase' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('Purchase');
                    }}
                    text="Purchase"
                />
                <Button
                    buttonClass={
                        activeTab === 'All' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('All');
                    }}
                    text="All"
                />
            </div>
            <div className={styles.usersList}>
                {getSortedData(
                    filterUsersByName(data, searchText),
                    activeTab,
                )?.map((user, id) => (
                    <UserLine
                        key={id}
                        name={user.Name}
                        value={getPercentValue(getStatValue(user, activeTab))}
                        onClick={() => onClickUser(user.Name)}
                    />
                ))}
            </div>
            <div className={styles.line}>
                <div className={styles.column}>
                    <Button
                        onClick={() => {}}
                        buttonClass="buttonRed"
                        text={`Copy falied ${activeTab.toLowerCase()} users`}
                    />
                    <Checkbox
                        isActive={fullInfoToCopy}
                        setIsActive={setFullInfoToCopy}
                        text="Display percent of completion"
                    />
                </div>
            </div>
        </div>
    );
};
