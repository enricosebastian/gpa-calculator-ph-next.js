import React, { useEffect, useState } from "react";
import Table from "./Table";

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
    const [terms, setTerms] = useState([
        {termName: "Term 1", courses: [
            {courseCode: "CCAPDEV", courseTitle: "Web App", grade: 4.0, units: 3.0},
            {courseCode: "GERPHIS", courseTitle: "History", grade: 3.5, units: 3.0}
        ]},
    ]);

    const [table, setTable] = useState(<Table term={terms[0]} setTerm={setTerms}/>);

    useEffect(() => {
        setTermButtons(prevState => {
            return prevState.map(term => {
                if(term.key === currentTerm) {
                    return <button key={term.key} onClick={goToTerm} disabled>{term.key}</button>;
                } else {
                    return <button key={term.key} onClick={goToTerm}>{term.key}</button>;
                }
            })
        });

        const newlyChosenTerm = terms.filter(term => {return term.termName === currentTerm});
        setTable(<Table term={terms[0]} setTerm={setTerms}/>);
    },[currentTerm]);
    
    useEffect(() => {
        if(termButtons.length > 1) {
            const newTerm = termButtons[termButtons.length-1].key;
            const currentTerms = terms.map(term => term.termName);
            const termIsNew = currentTerms.findIndex(term => term === newTerm) == -1;

            if(termIsNew) {
                setTerms(prevTerms => [...prevTerms, {termName: newTerm, courses: []}]);
            }
        }

    }, [termButtons]);


    return (
        <div className={styles.body__wrapper__full}>
            <div className={styles.body__terms__list}>
                {termButtons}
                <button onClick={addMoreTerms}>Add</button>
            </div>
            <div className={styles.body__header__term}>{currentTerm}</div>
            <div className={styles.body__table__term}>{table}</div>
        </div>
    );
}