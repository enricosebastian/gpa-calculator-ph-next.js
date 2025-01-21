import { useCourseContext } from '@/_context/CourseContext';
import styles from './RetroTable.module.scss';
import { Course } from '@/_types/Course';
import { useMainContext } from '@/_context/MainContext';
import { DlsuFormula } from '@/_formulas/DlsuFormula';
import { Calculator } from "@/_types/Calculator";
import { useTermContext } from '@/_context/TermContext';
import { Term } from '@/_types/Term';
import {v4 as uuid} from "uuid"; 
import { ChangeEvent, useContext, useEffect } from "react";
import { ExcelSheet } from '@/_types/ExcelSheet';

export default function RetroTable() {
    const {selectedCourses, selectedTermId, setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const selectedTerm = terms.find(term => term.id === selectedTermId);

    const handleTermNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const modified_term = {id: selectedTermId, name: e.target.value};

        modifyTerm(modified_term);
    };

    const handleClickImportButton = () => {
        document.getElementById('import_grades_button')?.click();
    }

    const handleExportData = async () => {
        ExcelSheet.export(terms, courses);
    }

    const handleFileUpload = async () => {
        const file_uploader = document.querySelector<HTMLInputElement>('#excel--file--uploader');
        if (file_uploader === null)
            return;

        if (file_uploader.files === null)
            return;

        if (file_uploader.files.length > 1)
            return;

        const file = file_uploader.files[0];
        const excel_sheet: ExcelSheet = new ExcelSheet();

        excel_sheet.initialize(file).then((data) => {
            const [new_terms, new_courses] = excel_sheet.getTermsAndCourses();

            courses.forEach(course => {
                deleteCourse(course);
            });

            terms.forEach(term => {
                deleteTerm(term);
            });

            new_terms.forEach(term => {
                addTerm(term);
            });

            new_courses.forEach(course => {
                addCourse(course);
            });

            if (new_terms.length > 0) {
                setSelectedTermId(new_terms[0].id);
            }
        }).catch((error) => {
            alert(error);
            return;
        })
    }

    return (
        <div className="retrotable--container">
            <div className="retrotable--content">
                <div className="retrotable--term--name--container">
                    <input className="term--name--input" type="text" value={selectedTerm?.name} onChange={e => handleTermNameChange(e)}></input>
                </div>
                <div className="retrotable--table--container">
                    <Table/>
                </div>
                <div className="retrotable--footer--container">
                    <button className={styles.retrotable_button} onClick={handleExportData}>export_grades</button> <button onClick={handleClickImportButton} className={styles.retrotable_button}>import_grades</button>
                    <input id='import_grades_button' className='hidden' type='file' accept='.xls,.xlsx' onChange={handleFileUpload}></input>
                </div>
            </div>
        </div>
    );
}


function Table() {
    const {selectedCourses, selectedTermId: selectedTermId, setSelectedTermId: setSelectedTermId} = useMainContext();
    const {courses, addCourse, modifyCourse, deleteCourse} = useCourseContext();

    const table_rows = selectedCourses.map(course => <TableRow key={course.id} course={course}/>)
    const my_formula: DlsuFormula = new DlsuFormula();
    const my_calculator: Calculator = new Calculator(my_formula);

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
                    <th className={styles.hidden_column}><button className={styles.retrotable_button} onClick={() => handleAddNewCourse()}>+</button></th>
                </tr>
            </thead>

            <tbody>
                {table_rows}
            </tbody>
        </table>
    );
}

interface TableRowProps {
    course: Course,
}

function TableRow({course}: TableRowProps) {
    const {selectedCourses, selectedTermId: selectedTermId, setSelectedTermId: setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, modifyCourse, deleteCourse} = useCourseContext();

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
        <tr>
            <td className={styles.long_column}><input type='text' id='course_name' name='' onChange={(e) => handleOnChange(e)} value={course.name}/></td>
            <td className={styles.medium_column}><input type='text' id='course_code' name='' onChange={(e) => handleOnChange(e)} value={course.code}/></td>
            <td><input type='text' id='course_grade' name='' onChange={(e) => handleOnChange(e)} value={course.grade}/></td>
            <td><input type='text' id='course_unit' name='' onChange={(e) => handleOnChange(e)} value={course.unit}/></td>
            <td className={styles.hidden_column}><button className={styles.retrotable_button} onClick={() => handleDelete(course)}>x</button></td>
        </tr>
    );
}