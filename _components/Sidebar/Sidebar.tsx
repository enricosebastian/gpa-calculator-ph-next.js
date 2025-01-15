import { useMainContext } from '@/_context/MainContext';
import styles from './Sidebar.module.scss';
import { useTermContext } from '@/_context/TermContext';
import { Tenali_Ramakrishna } from 'next/font/google';

export default function Sidebar() {
    const colleges = ['DLSU', 'AdMU', 'UST'];
    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)

    const {selectedTermId} = useMainContext();
    const {terms} = useTermContext();
    
    const selectedTerm = terms.find(term => term.id === selectedTermId);
    
    const term_select_fields = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);
    return (
        <>
            <div className={`${styles.sidebar_container} ${styles.sidebar_1}`}>
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}>your gpa is: <div className={styles.score_card}>4.000</div></div>
                    <div className={styles.sidebar_row}>your cgpa is: <div className={styles.score_card}>4.000</div></div>
                </div>
            </div>
            

            <div className={`${styles.sidebar_container} ${styles.sidebar_2}`}>
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}><select className={styles.sidebar_select}>{college_select_fields}</select></div>
                    <div className={styles.sidebar_row}><select className={styles.sidebar_select}>{term_select_fields}</select><button className={styles.sidebar_button}>+</button><button className={styles.sidebar_button}>-</button></div>
                </div>
            </div>
        
        </>
    );
}