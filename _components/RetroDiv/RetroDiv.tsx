import { useEffect, useState } from 'react';
import styles from './RetroDiv.module.scss';

export default function RetroDiv() {

    return (
        <div className={styles.retro_div}>
            <div className={`${styles.box} ${styles.bottom} ${styles.left}`}>this is a test</div>
            this is the content in retro div!
        </div>
    );
}