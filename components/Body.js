import React, { useEffect, useState } from "react";
import styles from "@/styles/Body.module.scss";

export default function Body() {
    const addMoreTerms = () => {
        setTermButtons((prevState) => {
            let termName = "Term " + (prevState.length + 1);
            return [...prevState, <button key={termName} onClick={goToTerm}>{termName}</button>]
        });
    };

    const goToTerm = e => {
        const currentTerm = e.currentTarget.innerText;
        setCurrentTerm(currentTerm);
    };

    const [termButtons, setTermButtons] = useState([<button key="Term 1" onClick={goToTerm} disabled>Term 1</button>]);
    const [currentTerm, setCurrentTerm] = useState("Term 1");


    useEffect(() => {
        console.log("Changing...");
        setTermButtons(prevState => {
            return prevState.map(term => {
                if(term.key === currentTerm) return <button key={term.key} onClick={goToTerm} disabled>{term.key}</button>;
                else return <button key={term.key} onClick={goToTerm}>{term.key}</button>;
            })
        });
    },[currentTerm]);


    return (
        <div className={styles.body__wrapper__full}>
            <div className={styles.body__terms__list}>
                {termButtons}
                <button onClick={addMoreTerms}>Add</button>
            </div>
            <div className={styles.body__header__name}>{currentTerm}</div>
            <div className={styles.body__table__term}>table</div>
        </div>
    );
}