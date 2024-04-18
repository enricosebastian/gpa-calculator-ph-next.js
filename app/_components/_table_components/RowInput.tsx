import Course from "@/app/_models/Course";
import { useState } from "react";


interface Props {
    course: Course | null;
    handleAddCourse: Function;
}

export default function RowInput({course}: Props) {
    const [courseCode, setCourseCode] = useState(course?.course_code);
    const [courseTitle, setCourseTitle] = useState(course?.course_title);
    const [grade, setGrade] = useState(course?.grade);
    const [unit, setUnit] = useState(course?.unit);

    function handleOnChange(e) {
        if (e.target.id === "course_code") {
            setCourseCode(e.target.value);
            return;
        }

        if (e.target.id === "course_title") {
            setCourseTitle(e.target.value);
            return;
        }

        if (e.target.id === "grade") {
            setGrade(e.target.value);
            return;
        }

        if (e.target.id === "unit") {
            setUnit(e.target.value);
            return;
        }
        
    }
    
    return (
        <tr className="border-black border-solid border-[5px]">
            <td className="border-black border-solid border-[5px]">
                <input id="course_code" className="pl-1" value={courseCode} onChange={e => handleOnChange(e)}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input id="course_title" className="pl-1" value={courseTitle} onChange={e => handleOnChange(e)}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input id="grade" className="pl-1" value={grade} onChange={e => handleOnChange(e)}></input>
            </td>
            <td className="border-black border-solid border-[5px]">
                <input id="unit" className="pl-1" value={unit} onChange={e => handleOnChange(e)}></input>
            </td>
        </tr>
    );
}