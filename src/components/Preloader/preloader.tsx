import styles from './preloader.module.scss';

export const Preloader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    );
};
