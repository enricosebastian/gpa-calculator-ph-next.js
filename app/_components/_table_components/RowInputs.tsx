import Term from "@/app/_models/Term";
import RowInput from "./RowInput";

interface Props {
    term: Term;
    handleAddCourse: Function,
}


export default function RowInputs({term, handleAddCourse}: Props) {
    const rowInputs = [...term.courses.map(course => <RowInput key={term.name+course.course_code} course={course} handleAddCourse={handleAddCourse}/>), <RowInput course={null} handleAddCourse={handleAddCourse}/>];
    return rowInputs;
}