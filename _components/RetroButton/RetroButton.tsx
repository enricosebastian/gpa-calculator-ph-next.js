import { MouseEventHandler } from 'react';
import styles from './RetroButton.module.scss';

interface RetroButtonProps {
    value?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function RetroButton(props: RetroButtonProps) {
    return <button className={styles.button} onClick={props?.onClick}>{props?.value}</button>
}