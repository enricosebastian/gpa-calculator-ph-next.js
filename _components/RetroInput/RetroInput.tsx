import React, { ChangeEventHandler, ReactNode } from 'react';
import styles from './RetroInput.module.scss';

interface RetroInputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string,
    type: string
}

export default function RetroInput(props: RetroInputProps) {
    return <input className={styles.input} type={props.type} value={props.value} onChange={props.onChange}></input>
}