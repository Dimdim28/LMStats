import { FC } from 'react';

import { Line, Progress, Title } from '../../components';
import { ExcelUser } from '../../constants';
import { getPercentValue } from '../../helpers';

import styles from './userStats.module.scss';

import avatar from '../../assets/avatar.png';

interface UserStatsProps {
    data: ExcelUser[] | null;
    user: string | null;
}

export const UserStats: FC<UserStatsProps> = ({ data, user }) => {
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
                    <p className={styles.name}> {Name}</p>
                    <p className={styles.id}>
                        ID: <span>{id}</span>
                    </p>
                </div>
            </div>
            <div className={styles.activities}>
                <Title title="Activities amount:" />
                <div className={styles.line}>
                    <Line text="Total" value={`${Total}`} />
                    <Line text="Hunt" value={`${Hunt}`} />
                    <Line text="Purchase" value={`${Purchase}`} />
                </div>
            </div>
            <div className={styles.hunt}>
                <Title title="Hunt stats" />
                <div className={styles.line}>
                    <div className={styles.column}>
                        <Line text="L1" value={`${l1hunt}`} />
                        <Line text="L2" value={`${l2hunt}`} />
                        <Line text="L3" value={`${l3hunt}`} />
                        <Line text="L4" value={`${l4hunt}`} />
                        <Line text="L5" value={`${l5hunt}`} />
                        <Line text="Total points" value={`${pointsHunt}`} />
                    </div>
                    <div className={styles.progressWrapper}>
                        <Progress value={getPercentValue(goalHunt)} />
                    </div>
                </div>
            </div>
            <div className={styles.purchase}>
                <Title title="Purchase stats" />
                <div className={styles.line}>
                    <div className={styles.column}>
                        <Line text="L1" value={`${l1purch}`} />
                        <Line text="L2" value={`${l2purch}`} />
                        <Line text="L3" value={`${l3purch}`} />
                        <Line text="L4" value={`${l4purch}`} />
                        <Line text="L5" value={`${l5purch}`} />
                        <Line text="Total points" value={`${pointsPurchase}`} />
                    </div>
                    <div className={styles.progressWrapper}>
                        <Progress value={getPercentValue(goalPurch)} />
                    </div>
                </div>
            </div>
        </>
    );
};
