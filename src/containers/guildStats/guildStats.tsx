import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, SearchUser, UserLine } from '../../components';
import { ColumnNames, ExcelUser, SortingTabType } from '../../constants';
import { I18n } from '../../enums/i18n-text';
import {
    // copyText,
    filterUsersByName,
    // getFailedUsersList,
    getPercentValue,
    getSortedData,
    getStatValue,
    // stringifyFailersList,
} from '../../helpers';

import styles from './guildStats.module.scss';

interface GuildStatsProps {
    data: ExcelUser[] | null;
    onClickUser: (userName: string) => void;
    columnNames: Partial<Record<ColumnNames, string>>;
    valuesBiggerThan100: boolean;
}

const GuildStats: FC<GuildStatsProps> = ({
    data,
    onClickUser,
    columnNames,
    valuesBiggerThan100,
}) => {
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
        filterUsersByName(data, searchText, columnNames.Name as string),
        activeTab,
        columnNames['HuntCompletion'] || '',
        columnNames['PurchCompletion'] || '',
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
                        name={user[columnNames['Name'] as string]}
                        value={getPercentValue(
                            getStatValue(
                                user,
                                activeTab,
                                columnNames['PurchCompletion'] as string,
                                columnNames['HuntCompletion'] as string,
                                valuesBiggerThan100,
                            ),
                        )}
                        onClick={() =>
                            onClickUser(
                                user[columnNames['Name'] as string] as string,
                            )
                        }
                    />
                ))}
            </div>
            <div className={styles.line}>
                <div className={styles.column}>
                    <Button
                        onClick={() => {
                            // copyText(
                            //     stringifyFailersList(
                            //         getFailedUsersList(sortedData, activeTab),
                            //         fullInfoToCopy,
                            //         activeTab,
                            //     ),
                            // );
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

export default GuildStats;
