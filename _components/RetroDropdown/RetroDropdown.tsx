import React, { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react';
import styles from './RetroDropdown.module.scss';

interface RetroDropdownProps {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLSelectElement>,
    onChange?: ChangeEventHandler<HTMLSelectElement>,
    value?: any
}

export default function RetroDropdown({children, ...props}: RetroDropdownProps) {
    return <select value={props?.value} onClick={props.onClick} onChange={props.onChange} className={styles.select}>{children}</select>
}