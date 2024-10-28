import { Course } from "@/_types/Course"

interface TableProps {
    courses: Course[],
    handleModifyCourse: (modified_course: Course) => void,
    handleDeleteCourse: (deleted_course: Course) => void,
}


export default function Table({courses, handleModifyCourse, handleDeleteCourse}: TableProps) {
    const table_rows = courses.map(course => <TableRow key={course.id} course={course} handleModifyCourse={handleModifyCourse} handleDeleteCourse={handleDeleteCourse}/>)
    
    return (
        <>
            <table className='table-fixed'>
                <thead>
                    <tr>
                        <th>course</th>
                        <th>course code</th>
                        <th>grade</th>
                        <th>unit</th>
                    </tr>
                </thead>

                <tbody>
                    {table_rows}
                </tbody>

                
            </table>
        </>
    );
}

interface TableRowProps {
    course: Course,
    handleModifyCourse: (modified_course: Course) => void,
    handleDeleteCourse: (deleted_course: Course) => void,
}

function TableRow({course, handleModifyCourse, handleDeleteCourse}: TableRowProps) {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (course === null)
            return;

        if (course === undefined)
            return;

        let modified_course: Course = {
            id: course.id,
            name: course.name,
            code: course.code,
            unit: course.unit,
            grade: course.grade,
            term: course.term,
        }

        const input_value: string = e.target.value;
        const last_character: string = input_value[input_value.length - 1];
        const number_of_period_occurences: number = input_value.replace(/[^.]/g, "").length;
        const last_character_is_not_number: boolean = Number.isNaN(parseInt(last_character));

        switch (e.target.id) {
            case 'course_name':
                modified_course.name = e.target.value;
                break;
            case 'course_code':
                modified_course.code = e.target.value;
                break;
            case 'course_grade':
                if (last_character === '.' && number_of_period_occurences > 1)
                    break;

                if (last_character === undefined || last_character === '.') {
                    modified_course.grade = e.target.value;
                    break;
                }

                if (last_character_is_not_number)
                    break;
                
                modified_course.grade = input_value;
                break;
            case 'course_unit':
                if (last_character === '.' && number_of_period_occurences > 1)
                    break;

                if (last_character === undefined || last_character === '.') {
                    modified_course.unit = e.target.value;
                    break;
                }

                if (last_character_is_not_number)
                    break;

                modified_course.unit = input_value;
                break;
        }

        handleModifyCourse(modified_course);
    }

    const handleDelete = (deleted_course: Course) => {
        handleDeleteCourse(deleted_course);
    }

    return (
        <tr>
            <td><input type='text' id='course_name' name='' onChange={(e) => handleOnChange(e)} value={course.name}/></td>
            <td><input type='text' id='course_code' name='' onChange={(e) => handleOnChange(e)} value={course.code}/></td>
            <td><input type='text' id='course_grade' name='' onChange={(e) => handleOnChange(e)} value={course.grade}/></td>
            <td>
                <input type='text' id='course_unit' name='' onChange={(e) => handleOnChange(e)} value={course.unit}/><button onClick={() => handleDelete(course)}>x</button>
            </td>
        </tr>
    );
}