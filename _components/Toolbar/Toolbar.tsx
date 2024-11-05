import { useTermContext } from "@/_context/TermContext";
import { Term } from "@/_types/Term"
import { ChangeEvent, useContext, useEffect } from "react";
import { useMainContext } from "@/_context/MainContext";
import {v4 as uuid} from "uuid"; 
import { Course } from "@/_types/Course";
import { useCourseContext } from "@/_context/CourseContext";

export default function Toolbar() {
    const {selectedCourses, selectedTermId: selectedTermId, setSelectedTermId: setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {addCourse, deleteCourse} = useCourseContext();

    const dropdown_values = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);
    const selected_term = terms.find(term => term.id === selectedTermId);

    if (!selected_term) {
        throw new Error('Term does not exist!');
    }

    const handleTermSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_term = terms.find(term => term.id === e.target.value);
        
        if (!new_selected_term) {
            throw new Error('Term does not exist!');
        }

        setSelectedTermId(new_selected_term.id);
    };

    const handleTermNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const modified_term = {id: selectedTermId, name: e.target.value};

        modifyTerm(modified_term);
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

    const handleAddNewCourse = () => {
        const new_course_id = uuid();

        const new_course: Course = {
            id: new_course_id,
            name: '',
            code: '',
            grade: '',
            unit: '',
            term_id: selectedTermId
        };
        
        addCourse(new_course);
    };
    
    return (
        <div>
            <select onChange={e => handleTermSelected(e)} value={selectedTermId}>{dropdown_values}</select>
            <input value={selected_term.name} onChange={e => handleTermNameChange(e)}></input>
            <button onClick={handleAddNewTerm}>Add a term</button>
            <button onClick={() => {terms.length <= 1 ? null : handleDeleteTerm()}} disabled={terms.length <= 1}>Delete this term</button>
            <button onClick={handleAddNewCourse}>Add a course</button>
        </div>
    );
}