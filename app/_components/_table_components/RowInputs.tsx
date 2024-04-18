import Term from "@/app/_models/Term";
import RowInput from "./RowInput";

interface Props {
    term: Term;
}


export default function RowInputs({term}: Props) {
    const rowInputs = [...term.courses.map(course => <RowInput key={term.name+course.course_code} course={course}/>), <RowInput course={null}/>];
    return rowInputs;
}