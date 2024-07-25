import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, SearchUser, UserLine } from '../../components';
import { ExcelUser, SortingTabType } from '../../constants';
import { I18n } from '../../enums/i18n-text';
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

    const failedSubject =
        activeTab === 'Hunt'
            ? t(I18n.FAILED_HUNT)
            : activeTab === 'All'
              ? t(I18n.ALL)
              : t(I18n.PURCHASE);

    const copyButtonText = `${t(I18n.COPY)} ${t(I18n.USERS)} ${t(I18n.FAILED)} ${failedSubject}`;

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
                    text={t(I18n.HUNT)}
                />
                <Button
                    buttonClass={
                        activeTab === 'Purchase' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('Purchase');
                    }}
                    text={t(I18n.PURCHASE)}
                />
                <Button
                    buttonClass={
                        activeTab === 'All' ? 'buttonRed' : 'buttonYellow'
                    }
                    onClick={() => {
                        setActiveTab('All');
                    }}
                    text={t(I18n.ALL)}
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
                        text={copyButtonText}
                    />
                    <Checkbox
                        isActive={fullInfoToCopy}
                        setIsActive={setFullInfoToCopy}
                        text={t(I18n.PERSENTAGE_CHECKBOX)}
                    />
                </div>
            </div>
        </div>
    );
};
