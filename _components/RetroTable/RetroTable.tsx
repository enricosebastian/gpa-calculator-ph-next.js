import { useCourseContext } from '@/_context/CourseContext';
import styles from './RetroTable.module.scss';
import { Course } from '@/_types/Course';
import { useMainContext } from '@/_context/MainContext';
import {v4 as uuid} from "uuid"; 
import RetroButton from '../RetroButton/RetroButton';

export default function RetroTable() {
    const {selectedCourses, selectedTermId} = useMainContext();
    const {addCourse} = useCourseContext();

    const table_rows = selectedCourses.map(course => <RetroTableRow key={course.id} course={course}/>)

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
        <table className={styles.retrotable}>
            <thead>
                <tr>
                    <th className={styles.long_column}>course</th>
                    <th className={styles.medium_column}>course code</th>
                    <th>grade</th>
                    <th>unit</th>
                    <th className={styles.hidden_column}><RetroButton onClick={() => handleAddNewCourse()}>+</RetroButton></th>
                </tr>
            </thead>

            <tbody>
                {table_rows}
            </tbody>

        </table>
    );
}

interface RetroTableRowProps {
    course: Course,
}

function RetroTableRow({course}: RetroTableRowProps) {
    const {selectedTermId} = useMainContext();
    const { addCourse, modifyCourse, deleteCourse} = useCourseContext();

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
            term_id: course.term_id,
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

        modifyCourse(modified_course);
    }

    const handleDelete = (deleted_course: Course) => {
        deleteCourse(deleted_course);
    }

    return (
        <tr>
            <td className={styles.long_column}><input type='text' id='course_name' name='' onChange={(e) => handleOnChange(e)} value={course.name}/></td>
            <td className={styles.medium_column}><input type='text' id='course_code' name='' onChange={(e) => handleOnChange(e)} value={course.code}/></td>
            <td><input type='text' id='course_grade' name='' onChange={(e) => handleOnChange(e)} value={course.grade}/></td>
            <td><input type='text' id='course_unit' name='' onChange={(e) => handleOnChange(e)} value={course.unit}/></td>
            <td className={styles.hidden_column}><RetroButton onClick={() => handleDelete(course)}>x</RetroButton></td>
        </tr>
    );
}