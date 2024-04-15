import Course from "@/app/_models/Course";
import Term from "@/app/_models/Term";
import { countReset } from "console";

interface Props {
    term: Term;
}

interface RowInputProps {
    course: Course | null;
}
function RowInput({course}: RowInputProps) {
    
    return (
        <tr className="border-black border-solid border-[5px]">
            <td className="border-black border-solid border-[5px]">
                <input className="pl-1" value={course?.course_code}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input className="pl-1" value={course?.course_title}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input className="pl-1" value={course?.grade}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input className="pl-1" value={course?.unit}></input>
            </td>
        </tr>
    );
}


export default function RowInputs({term}: Props) {
    const rowInputs = [...term.courses.map(course => <RowInput key={term.name+course.course_code} course={course}/>), <RowInput course={null}/>];
    return rowInputs;
}