import { FC } from 'react';

import { InfoData } from '../../types/infoData';

import styles from './info.module.scss';

type InfoProps = {
    data: InfoData[];
};

const Info: FC<InfoProps> = ({ data }) => {
    return (
        <div className={styles.info}>
            {data.map((el, i) => {
                return (
                    <p key={i}>
                        <p
                            className={styles.title}
                            dangerouslySetInnerHTML={el.title}
                        ></p>
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={el.description}
                        ></p>
                    </p>
                );
            })}
        </div>
    );
};

export default Info;
