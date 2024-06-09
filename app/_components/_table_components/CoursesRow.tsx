import Term from "@/app/_models/Term";
import SingleCourseRow from "./SingleCourseRow";

import {v4 as uuid} from 'uuid';

interface Props {
    term: Term;
    handleAddCourse: Function,
}

export default function CoursesRow({term, handleAddCourse}: Props) {

    const rowInputs = [
        // All the courses entered for the term
        ...term.courses.map(course => <SingleCourseRow key={course.id} course={course} handleAddCourse={handleAddCourse}/>),

        // One row where it's emtpy
        <SingleCourseRow key={uuid()} handleAddCourse={handleAddCourse}/>
    ];
    return rowInputs;

}