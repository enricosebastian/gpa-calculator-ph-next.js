import { useMainContext } from '@/_context/MainContext';
import styles from './Sidebar.module.scss';
import { useTermContext } from '@/_context/TermContext';
import { Tenali_Ramakrishna } from 'next/font/google';
import { useCourseContext } from '@/_context/CourseContext';
import { ChangeEvent, useContext, useEffect } from "react";
import {v4 as uuid} from "uuid"; 
import { Term } from '@/_types/Term';
import { Course } from '@/_types/Course';
import { DlsuFormula } from '@/_formulas/DlsuFormula';
import { Calculator } from '@/_types/Calculator';
import RetroDropdown from '../RetroDropdown/RetroDropdown';
import RetroButton from '../RetroButton/RetroButton';
import { University } from '@/_types/Enums';

export default function Sidebar() {
    const colleges: string[] = Object.keys(University).filter(university => university !== 'NONE');

    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)

    const {selectedCourses, selectedTermId: selectedTermId, setSelectedTermId: setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();
    
    const selectedTerm = terms.find(term => term.id === selectedTermId);
    
    const term_select_fields = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

    const my_formula: DlsuFormula = new DlsuFormula();
    const my_calculator: Calculator = new Calculator(my_formula);

    const handleTermSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_term = terms.find(term => term.id === e.target.value);
        
        if (!new_selected_term) {
            throw new Error('Term does not exist!');
        }

        setSelectedTermId(new_selected_term.id);
    };

    const handleAddNewTerm = () => {
        const new_term_id = uuid();

        const new_term: Term = {
            id: new_term_id,
            name: `term ${new_term_id.substring(0,4)}`
        };

        const new_course: Course = {
            id: uuid(),
            name: '',
            code: '',
            grade: '',
            unit: '',
            term_id: new_term_id
        };

        addTerm(new_term);
        addCourse(new_course);
        setSelectedTermId(new_term_id);
    };

    const handleDeleteTerm = () => {
        const selected_term = terms.find(term => term.id === selectedTermId);
        console.log(selected_term);

        if (!selected_term) return;

        const selected_term_index = terms.indexOf(selected_term);
        console.log(`new selected term is ${selected_term_index}`);

        if (selected_term_index <= 0 && terms.length > 1) {
            setSelectedTermId(terms[1].id);
        } else if (terms.length > 1) {
            setSelectedTermId(terms[selected_term_index - 1].id);
        }

        selectedCourses.forEach(course => {
            deleteCourse(course);
        });

        deleteTerm(selected_term);
    };

    const termStanding = my_calculator.getTermStanding(selectedCourses) === '' ? <></> : <div className={styles.sidebar_row}><div className={styles.score_card}>{my_calculator.getTermStanding(selectedCourses)}</div></div>;
    const overallStanding = my_calculator.getOverallStanding(courses) === '' ? <></> : <div className={styles.sidebar_row}><div className={styles.score_card}>{my_calculator.getOverallStanding(courses)}</div></div>;
    

    return (
        <>
            <div className={`${styles.sidebar_container} ${styles.sidebar_1}`}>
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}>your gpa is: <div className={styles.score_card}>{my_calculator.getScore(selectedCourses)}</div></div>
                    <div className={styles.sidebar_row}>your cgpa is: <div className={styles.score_card}>{my_calculator.getScore(courses)}</div></div>
                    {termStanding}
                    {overallStanding}
                </div>
            </div>
            

            <div className={`${styles.sidebar_container} ${styles.sidebar_2}`}> 
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}><RetroDropdown>{college_select_fields}</RetroDropdown></div>
                    <div className={styles.sidebar_row}><RetroDropdown onChange={e => handleTermSelected(e)} value={selectedTermId}>{term_select_fields}</RetroDropdown><RetroButton onClick={handleAddNewTerm}>+</RetroButton><RetroButton onClick={() => {terms.length <= 1 ? null : handleDeleteTerm()}}>-</RetroButton></div>
                </div>
            </div>
        </>
    );
}