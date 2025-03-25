import { Children, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import styles from './RetroDiv.module.scss';
import RetroDropdown from '../RetroDropdown/RetroDropdown';
import { Orientation } from '@/_types/Enums';

interface RetroDivProps {
    children?: ReactNode,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
}

export function RetroDiv({children, ...props}: RetroDivProps) {

    return (
        <div className={`${styles.retro_div} ${props.className}`} onClick={props.onClick}>
            {children}
        </div>
    );
}

interface RetroDivButtonProps {
    children?: ReactNode,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
    orientation?: Orientation
}

export function RetroDivButton({children, ...props}: RetroDivButtonProps) {
    if (!props.orientation) {
        props.className += ` ${styles.top} ${styles.right}`;
    } else if (props.orientation === Orientation.BOTTOM) {
        props.className += ` ${styles.bottom}`;
    } else if (props.orientation === Orientation.TOP) {
        props.className += ` ${styles.top}`;
    } else if (props.orientation === Orientation.RIGHT) {
        props.className += ` ${styles.right}`;
    } else if (props.orientation === Orientation.LEFT) {
        props.className += ` ${styles.left}`;
    } else if (props.orientation === Orientation.TOP_LEFT) {
        props.className += ` ${styles.top} ${styles.left}`;
    } else if (props.orientation === Orientation.TOP_RIGHT) {
        props.className += ` ${styles.top} ${styles.right}`;
    } else if (props.orientation === Orientation.BOTTOM_LEFT) {
        props.className += ` ${styles.bottom} ${styles.left}`;
    } else if (props.orientation === Orientation.BOTTOM_RIGHT) {
        props.className += ` ${styles.bottom} ${styles.right}`;
    } else {
        props.className += ` ${styles.top} ${styles.right}`;
    }

    return <div className={`${styles.box} ${props.className}`} onClick={props.onClick}>{children}</div>
}

interface RetroDivSubComponentProps {
    children?: ReactNode,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
    orientation?: Orientation
}

export function RetroDivSubComponent({children, ...props}: RetroDivSubComponentProps) {
    if (!props.orientation) {
        props.className += ` ${styles.bottom}`;
    } else if (props.orientation != Orientation.BOTTOM && props.orientation != Orientation.TOP) {
        props.className += ` ${styles.bottom}`;
    } else if (props.orientation === Orientation.BOTTOM) {
        props.className += ` ${styles.bottom}`;
    } else if (props.orientation === Orientation.TOP) {
        props.className += ` ${styles.top}`;
    } else {
        props.className += ` ${styles.bottom}`;
    }

    return <div className={`${styles.component} ${props.className}`}>{children}</div>
}