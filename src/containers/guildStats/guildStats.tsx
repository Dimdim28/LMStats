import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, SearchUser, UserLine } from '../../components';
import { ExcelUser, SortingTabType } from '../../constants';
import {
    copyText,
    filterUsersByName,
    getFailedUsersList,
    getPercentValue,
    getSortedData,
    getStatValue,
    stringifyFailersList,
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

    const { t } = useTranslation();

    const sortedData = getSortedData(
        filterUsersByName(data, searchText),
        activeTab,
    );

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
                    text={t('hunt')}
                />
                <Button
                    buttonClass={
                        activeTab === 'Purchase' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('Purchase');
                    }}
                    text={t('purchase')}
                />
                <Button
                    buttonClass={
                        activeTab === 'All' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('All');
                    }}
                    text={t('all')}
                />
            </div>
            <div className={styles.usersList}>
                {sortedData?.map((user, id) => (
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
                        onClick={() => {
                            copyText(
                                stringifyFailersList(
                                    getFailedUsersList(sortedData, activeTab),
                                    fullInfoToCopy,
                                    activeTab,
                                ),
                            );
                        }}
                        buttonClass="buttonRed"
                        text={t('copyUser')}
                    />
                    <Checkbox
                        isActive={fullInfoToCopy}
                        setIsActive={setFullInfoToCopy}
                        text={t('presentageCheckbox')}
                    />
                </div>
            </div>
        </div>
    );
};
