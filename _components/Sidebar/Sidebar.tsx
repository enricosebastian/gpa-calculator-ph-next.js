import styles from './Sidebar.module.scss';

export default function Sidebar() {
    return (
        <>
            <div className={`${styles.sidebar_container} ${styles.sidebar_1}`}>
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}>your gpa is: <div className={styles.score_card}>4.000</div></div>
                    <div className={styles.sidebar_row}>your cgpa is: <div className={styles.score_card}>4.000</div></div>

                </div>
            </div>
            

            <div className={`${styles.sidebar_container} ${styles.sidebar_2}`}>
                <div className={styles.sidebar_content}></div>
            </div>
        
        </>
    );
}