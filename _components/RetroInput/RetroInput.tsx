import React, { ChangeEventHandler, CSSProperties, ReactNode } from 'react';
import styles from './RetroInput.module.scss';

interface RetroInputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string,
    type: string,
    className?: string,
    style?: CSSProperties,
    id?: string,
    placeholder?: string,
}

export default function RetroInput(props: RetroInputProps) {
    return (<input 
                id={props.id} 
                className={`${styles.input} ${props.className}`} 
                placeholder={props.placeholder} 
                style={props.style} 
                type={props.type} 
                value={props.value} 
                onChange={props.onChange}>
            </input>);
}