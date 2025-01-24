import React, { ReactNode } from 'react';
import styles from './RetroDropdown.module.scss';

export default function RetroDropdown({children}: {children: ReactNode}) {
    return <select className={styles.select}>{children}</select>
}