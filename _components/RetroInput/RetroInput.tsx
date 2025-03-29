import React, { ChangeEventHandler, CSSProperties, ReactNode } from 'react';
import styles from './RetroInput.module.scss';

interface RetroInputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string,
    type: string,
    className?: string,
    style?: CSSProperties,
}

export default function RetroInput(props: RetroInputProps) {
    return <input className={`${styles.input} ${props.className}`} style={props.style} type={props.type} value={props.value} onChange={props.onChange}></input>
}