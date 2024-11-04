import { useTermContext } from "@/_context/TermContext";
import { Term } from "@/_types/Term"
import { ChangeEvent, useContext, useEffect } from "react";
import { useMainContext } from "@/_context/MainContext";
import {v4 as uuid} from "uuid"; 
import { Course } from "@/_types/Course";
import { useCourseContext } from "@/_context/CourseContext";

export default function Toolbar() {
    const {selectedCourses, selectedTerm, setSelectedTerm} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {addCourse, deleteCourse} = useCourseContext();

    const dropdown_values = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

    const handleTermSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_term = terms.find(term => term.id === e.target.value);
        
        if (!new_selected_term) {
            throw new Error('Term does not exist!');
        }

        setSelectedTerm(new_selected_term);
    };

    const handleTermNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const modified_term = {...selectedTerm, name: e.target.value};

        modifyTerm(modified_term);
        setSelectedTerm(modified_term);
    };

    const handleAddNewTerm = () => {
        const new_term_id = uuid();

        const new_term: Term = {
            id: new_term_id,
            name: `term ${new_term_id.substring(0,4)}`
        };

        const new_course: Course = {
            id: uuid(),
            name: 'yeeter',
            code: '',
            grade: '',
            unit: '',
            term_id: new_term_id
        };

        addTerm(new_term);
        addCourse(new_course);
    };

    const handleDeleteTerm = () => {
        const newSelectedTermIndex = terms.indexOf(selectedTerm);

        if (newSelectedTermIndex === 0 && terms.length > 1) {
            setSelectedTerm(terms[1]);
        } else if (terms.length > 1) {
            setSelectedTerm(terms[newSelectedTermIndex - 1]);
        }

        deleteTerm(selectedTerm);

        selectedCourses.forEach(course => {
            deleteCourse(course);
        });

        
    };

    const handleAddNewCourse = () => {
        const new_course_id = uuid();

        const new_course: Course = {
            id: new_course_id,
            name: '',
            code: '',
            grade: '',
            unit: '',
            term_id: selectedTerm.id
        };
        
        addCourse(new_course);
    };
    
    return (
        <div>
            <select onChange={e => handleTermSelected(e)} value={selectedTerm.id}>{dropdown_values}</select>
            <input value={selectedTerm.name} onChange={e => handleTermNameChange(e)}></input>
            <button onClick={handleAddNewTerm}>Add a term</button>
            <button onClick={() => {terms.length <= 1 ? null : handleDeleteTerm()}} disabled={terms.length <= 1}>Delete this term</button>
            <button onClick={handleAddNewCourse}>Add a course</button>
        </div>
    );
}