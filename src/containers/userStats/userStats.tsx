import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CopyIcon from '../../assets/copy-icon';
import { Line, Progress, Title } from '../../components';
import { ColumnNames, ExcelUser } from '../../constants';
import { I18n } from '../../enums/i18n-text';
import { getPercentValue } from '../../helpers';

import styles from './userStats.module.scss';

import avatar from '../../assets/avatar.png';

interface UserStatsProps {
    data: ExcelUser[] | null;
    user: string | null;
    columnNames: Partial<Record<ColumnNames, string>>;
}

const UserStats: FC<UserStatsProps> = ({ data, user, columnNames }) => {
    const { t } = useTranslation();
    if (!data || !user) {
        return <div>Error</div>;
    }
    const userData = data.find(
        (el) => (el[columnNames['Name'] as string] as string) === user,
    );

    console.log(userData, columnNames);

    if (!userData) return <div>Error</div>;

    const {
        [columnNames['Name'] as string]: Name,
        [columnNames['UserID'] as string]: id,
        [columnNames['HuntActions'] as string]: Hunt,
        [columnNames['PurchActions'] as string]: Purchase,
        [columnNames['TotalActions'] as string]: Total,
        [columnNames['L1Hunt'] as string]: l1hunt,
        [columnNames['L2Hunt'] as string]: l2hunt,
        [columnNames['L3Hunt'] as string]: l3hunt,
        [columnNames['L4Hunt'] as string]: l4hunt,
        [columnNames['L5Hunt'] as string]: l5hunt,
        [columnNames['L1Purch'] as string]: l1purch,
        [columnNames['L2Purch'] as string]: l2purch,
        [columnNames['L3Hunt'] as string]: l3purch,
        [columnNames['L4Hunt'] as string]: l4purch,
        [columnNames['L5Hunt'] as string]: l5purch,
        [columnNames['HuntPoints'] as string]: pointsHunt,
        [columnNames['PurchsPoints'] as string]: pointsPurchase,
        [columnNames['HuntCompletion'] as string]: goalHunt,
        [columnNames['PurchCompletion'] as string]: goalPurch,
    } = userData;

    console.log(
        Name,
        id,
        Hunt,
        Purchase,
        Total,
        l1hunt,
        l2hunt,
        l3hunt,
        l4hunt,
        l5hunt,
        l1purch,
        l2purch,
        l3purch,
        l4purch,
        l5purch,
        pointsHunt,
        pointsPurchase,
        goalHunt,
        goalPurch,
    );
    return (
        <>
            <div className={styles.user}>
                <img alt="avatar" src={avatar} width={103} height={103} />
                <div className={styles.column}>
                    <div className={styles.line}>
                        <p className={styles.name}> {Name}</p>
                        <CopyIcon
                            className={styles.copyIcon}
                            copyValue={Name as string}
                        />
                    </div>
                    <div className={styles.line}>
                        <p className={styles.id}>
                            ID: <span>{id}</span>
                        </p>
                        <CopyIcon
                            className={styles.copyIcon}
                            copyValue={id as string}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.activities}>
                <Title title={t(I18n.USER_ACTIVITY)} />
                <div className={styles.line}>
                    <Line text={t(I18n.TOTAL)} value={`${Total}`} />
                    <Line text={t(I18n.HUNT)} value={`${Hunt}`} />
                    <Line text={t(I18n.PURCHASE)} value={`${Purchase}`} />
                </div>
            </div>
            <div className={styles.hunt}>
                <Title title={t(I18n.HUNT_STATS)} />
                <div className={styles.line}>
                    <div className={styles.column}>
                        <Line text={t(I18n.L1)} value={`${l1hunt}`} />
                        <Line text={t(I18n.L2)} value={`${l2hunt}`} />
                        <Line text={t(I18n.L3)} value={`${l3hunt}`} />
                        <Line text={t(I18n.L4)} value={`${l4hunt}`} />
                        <Line text={t(I18n.L5)} value={`${l5hunt}`} />
                        <Line
                            text={t(I18n.TOTAL_POINTS)}
                            value={`${pointsHunt}`}
                        />
                    </div>
                    <div className={styles.progressWrapper}>
                        <Progress value={getPercentValue(goalHunt as number)} />
                    </div>
                </div>
            </div>
            <div className={styles.purchase}>
                <Title title={t(I18n.PURCHASE_STATS)} />
                <div className={styles.line}>
                    <div className={styles.column}>
                        <Line text={t(I18n.L1)} value={`${l1purch}`} />
                        <Line text={t(I18n.L2)} value={`${l2purch}`} />
                        <Line text={t(I18n.L3)} value={`${l3purch}`} />
                        <Line text={t(I18n.L4)} value={`${l4purch}`} />
                        <Line text={t(I18n.L5)} value={`${l5purch}`} />
                        <Line
                            text={t(I18n.TOTAL_POINTS)}
                            value={`${pointsPurchase}`}
                        />
                    </div>
                    <div className={styles.progressWrapper}>
                        <Progress
                            value={getPercentValue(goalPurch as number)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserStats;
