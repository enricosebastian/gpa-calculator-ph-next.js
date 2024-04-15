import Course from "@/app/_models/Course";

interface Props {
    course: Course | null;
}

export default function RowInput({course}: Props) {
    
    return (
        <>
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
        </>
    );
}