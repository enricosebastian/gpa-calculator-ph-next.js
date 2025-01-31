import { MouseEventHandler, ReactNode } from 'react';
import styles from './RetroButton.module.scss';

interface RetroButtonProps {
    title?: string,
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function RetroButton({children, ...props}: RetroButtonProps) {
    return <button title={props?.title} className={styles.button} onClick={props?.onClick}>{children}</button>
}