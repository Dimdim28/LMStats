import { FC, useState } from 'react';

import { Button, Checkbox, SearchUser, UserLine } from '../../components';
import { ExcelUser, SortingTabType } from '../../constants';
import { getSortedData } from '../../helpers';

import styles from './guildStats.module.scss';

interface GuildStatsProps {
    data: ExcelUser[] | null;
    onClickUser: (userName: string) => void;
}

export const GuildStats: FC<GuildStatsProps> = ({ data, onClickUser }) => {
    const [activeTab, setActiveTab] = useState<SortingTabType>('Hunt');
    const [fullInfoToCopy, setFullInfoToCopy] = useState(false);
    const [searchText, setSearchText] = useState('');

    const getValue = (data: ExcelUser, tab: SortingTabType) => {
        const huntValue = data['Goal Percentage (Hunt)'];
        const purchaseValue = data['Goal Percentage (Purchase)'];
        const allValue = huntValue + purchaseValue / 2;

        switch (tab) {
            case 'Hunt':
                return huntValue;
            case 'Purchase':
                return purchaseValue;
            default:
                return allValue;
        }
    };

    const filteredByNamesUsers =
        data?.filter((el) =>
            el.Name.toLocaleLowerCase().includes(searchText.toLowerCase()),
        ) || [];

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
                {getSortedData(filteredByNamesUsers, activeTab)?.map(
                    (user, id) => (
                        <UserLine
                            key={id}
                            name={user.Name}
                            value={Math.round(getValue(user, activeTab) * 100)}
                            onClick={() => onClickUser(user.Name)}
                        />
                    ),
                )}
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
