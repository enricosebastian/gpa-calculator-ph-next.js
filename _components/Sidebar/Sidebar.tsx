import { useMainContext } from '@/_context/MainContext';
import styles from './Sidebar.module.scss';
import { useTermContext } from '@/_context/TermContext';
import { Tenali_Ramakrishna } from 'next/font/google';
import { useCourseContext } from '@/_context/CourseContext';
import { ChangeEvent, useContext, useEffect } from "react";
import {v4 as uuid} from "uuid"; 
import { Term } from '@/_types/Term';
import { Course } from '@/_types/Course';

export default function Sidebar() {
    const colleges = ['DLSU', 'AdMU', 'UST'];
    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)

    const {selectedCourses, selectedTermId: selectedTermId, setSelectedTermId: setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();
    
    const selectedTerm = terms.find(term => term.id === selectedTermId);
    
    const term_select_fields = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

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

    return (
        <>
            <div className={`${styles.sidebar_container} ${styles.sidebar_1}`}>
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}>your gpa is: <div className={styles.score_card}>4.000</div></div>
                    <div className={styles.sidebar_row}>your cgpa is: <div className={styles.score_card}>4.000</div></div>
                </div>
            </div>
            

            <div className={`${styles.sidebar_container} ${styles.sidebar_2}`}> 
                <div className={styles.sidebar_content}>
                    <div className={styles.sidebar_row}><select className={styles.sidebar_select}>{college_select_fields}</select></div>
                    <div className={styles.sidebar_row}><select className={styles.sidebar_select} onChange={e => handleTermSelected(e)} value={selectedTermId}>{term_select_fields}</select><button className={styles.sidebar_button} onClick={handleAddNewTerm}>+</button><button className={styles.sidebar_button} onClick={() => {terms.length <= 1 ? null : handleDeleteTerm()}}>-</button></div>
                </div>
            </div>
        
        </>
    );
}