import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CopyIcon from '../../assets/copy-icon';
import { Line, Progress, Title } from '../../components';
import { ExcelUser } from '../../constants';
import { I18n } from '../../enums/i18n-text';
import { getPercentValue } from '../../helpers';

import styles from './userStats.module.scss';

import avatar from '../../assets/avatar.png';

interface UserStatsProps {
    data: ExcelUser[] | null;
    user: string | null;
}

export const UserStats: FC<UserStatsProps> = ({ data, user }) => {
    const { t } = useTranslation();
    if (!data || !user) {
        return <div>Error</div>;
    }
    const userData = data.find((el) => el.Name === user);

    if (!userData) return <div>Error</div>;

    const {
        Name,
        'User ID': id,
        Hunt,
        Purchase,
        Total,
        'L1 (Hunt)': l1hunt,
        'L2 (Hunt)': l2hunt,
        'L3 (Hunt)': l3hunt,
        'L4 (Hunt)': l4hunt,
        'L5 (Hunt)': l5hunt,
        'L1 (Purchase)': l1purch,
        'L2 (Purchase)': l2purch,
        'L3 (Purchase)': l3purch,
        'L4 (Purchase)': l4purch,
        'L5 (Purchase)': l5purch,
        'Points (Hunt)': pointsHunt,
        'Points (Purchase)': pointsPurchase,
        'Goal Percentage (Hunt)': goalHunt,
        'Goal Percentage (Purchase)': goalPurch,
    } = userData;

    return (
        <>
            <div className={styles.user}>
                <img alt="avatar" src={avatar} width={103} height={103} />
                <div className={styles.column}>
                    <div className={styles.line}>
                        <p className={styles.name}> {Name}</p>
                        <CopyIcon
                            className={styles.copyIcon}
                            copyValue={Name}
                        />
                    </div>
                    <div className={styles.line}>
                        <p className={styles.id}>
                            ID: <span>{id}</span>
                        </p>
                        <CopyIcon
                            className={styles.copyIcon}
                            copyValue={id.toString()}
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
                        <Progress value={getPercentValue(goalHunt)} />
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
                        <Progress value={getPercentValue(goalPurch)} />
                    </div>
                </div>
            </div>
        </>
    );
};
