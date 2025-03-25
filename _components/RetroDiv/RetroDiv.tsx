import { useEffect, useState } from 'react';
import styles from './RetroDiv.module.scss';
import RetroDropdown from '../RetroDropdown/RetroDropdown';

export default function RetroDiv() {

    return (
        <div className={styles.retro_div}>
            <div className={`${styles.box} ${styles.left}`}>+</div>
            <div className={`${styles.box} ${styles.right}`}>-</div>
            <div className={`${styles.component} ${styles.top}`}><RetroDropdown><option>test</option></RetroDropdown></div>
            this is the content in retro div!
        </div>
    );
}