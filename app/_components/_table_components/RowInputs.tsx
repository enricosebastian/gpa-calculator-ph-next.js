import Term from "@/app/_models/Term";
import RowInput from "./RowInput";

interface Props {
    term: Term;
}

export default function RowInputs({term}: Props) {
    const inputData = (term.courses.length > 0) ? term.courses.map(course => <RowInput key={term.name+course.course_code} course={course}/>) : <RowInput course={null}/>;

    return (
        <tr className="border-black border-solid border-[5px]">
            {inputData}
        </tr>
    );
}