import { MouseEventHandler, ReactNode } from 'react';
import styles from './RetroButton.module.scss';

interface RetroButtonProps {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function RetroButton({children, ...props}: RetroButtonProps) {
    return <button className={styles.button} onClick={props?.onClick}>{children}</button>
}