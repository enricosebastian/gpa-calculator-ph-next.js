import { Orientation, University } from "@/_types/Enums";
import { RetroDiv, RetroDivSubComponent, RetroDivButton } from "../RetroDiv/RetroDiv";
import RetroDropdown from "../RetroDropdown/RetroDropdown";
import { useMainContext } from "@/_context/MainContext";
import { useTermContext } from "@/_context/TermContext";
import { useCourseContext } from "@/_context/CourseContext";
import { ChangeEvent, MouseEventHandler, ReactNode } from "react";
import { Course } from "@/_types/Course";
import { useTheme } from "next-themes";
import { Calculator } from "@/_types/Calculator";
import styles from './CompactMain.module.scss';
import RetroButton from "../RetroButton/RetroButton";
import {v4 as uuid} from 'uuid'; 
import { ExcelSheet } from '@/_types/ExcelSheet';
import RetroInput from "../RetroInput/RetroInput";

export default function CompactMain() {
    const {selectedCourses, selectedTermId, setSelectedTermId, university, setUniversity} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const {theme, setTheme} = useTheme();

    const colleges: string[] = Object.keys(University).filter(university => university !== 'NONE');
    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)
    const term_select_fields = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

    const retroDivCourses = selectedCourses.map(course => <RetroDivCourse key={course.id} course={course}/>);

    const my_calculator = new Calculator(university);

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

    const handleCollegeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_university: University = e.target.value as University;
        
        if (!new_selected_university) {
            throw new Error('University does not exist!');
        }

        setTheme(new_selected_university);
        setUniversity(new_selected_university);
    };

    const handleTermSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_term = terms.find(term => term.id === e.target.value);
        
        if (!new_selected_term) {
            throw new Error('Term does not exist!');
        }

        setSelectedTermId(new_selected_term.id);
    };

    const handleClickImportButton = () => {
            document.getElementById('import_grades_button')?.click();
        }
    
        const handleExportData = async () => {
            ExcelSheet.export(terms, courses);
        }
    
        const handleFileUpload = async () => {
            const file_uploader = document.querySelector<HTMLInputElement>('#import_grades_button');
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
        <>
            <RetroDiv className={styles.main_div}>
                <RetroDivSubComponent orientation={Orientation.TOP}>
                    <RetroDropdown onChange={e => handleCollegeSelected(e)}>{college_select_fields}</RetroDropdown>
                </RetroDivSubComponent>

                <RetroDivSubComponent orientation={Orientation.BOTTOM}>
                    <RetroDropdown onChange={e => handleTermSelected(e)} value={selectedTermId}>{term_select_fields}</RetroDropdown>
                </RetroDivSubComponent>

                <RetroDivButton orientation={Orientation.BOTTOM_LEFT}>+</RetroDivButton>
                <RetroDivButton orientation={Orientation.BOTTOM_RIGHT}>x</RetroDivButton>

                <div className={styles.content}>Standing: {my_calculator.getOverallStanding(courses)}</div>
                <div className={styles.content}>Term: {my_calculator.getTermStanding(selectedCourses)}</div>
                <div className={styles.content}>GPA: {my_calculator.getScore(selectedCourses)}</div>
                <div className={styles.content}>CGPA: {my_calculator.getScore(courses)}</div>
            </RetroDiv>
            
            <div className={styles.button_area}>
                <RetroButton onClick={() => handleAddNewCourse()}>Add a course</RetroButton>
            </div>

            {retroDivCourses}

            <div className={styles.button_area}>
                <input id='import_grades_button' className='hidden' type='file' accept='.xls,.xlsx' onChange={handleFileUpload}></input>
                <RetroButton  onClick={handleClickImportButton} title='File support is limited to only .xls and .xlsx types!'>Import grades</RetroButton>
                <RetroButton onClick={handleExportData}>Export grades</RetroButton>
            </div>
        </>
    );

}

interface RetroDivCourseProps {
    course?: Course,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
}


function RetroDivCourse({course, ...props}: RetroDivCourseProps) {

    const { addCourse, modifyCourse, deleteCourse} = useCourseContext();

    const handleDelete = (deleted_course: Course) => {
        deleteCourse(deleted_course);
    }

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

    if (course === undefined) {
        return <></>;
    }

    return (
        <RetroDiv className={`${props.className} ${styles.course_container}`} style={{height: 100, marginBottom: 50}}>
            <RetroDivButton orientation={Orientation.TOP_RIGHT} onClick={() => handleDelete(course)}>x</RetroDivButton>

            <div className={`${styles.content} ${styles.first}`}>
                <RetroInput placeholder="coursed_code" id="course_code" type="text" className={styles.retro_input} value={course.code} onChange={(e) => handleOnChange(e)}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.second}`}>
                <RetroInput placeholder="course_name" id="course_name" type="text" className={styles.retro_input} value={course.name} onChange={(e) => handleOnChange(e)}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.third}`}>
                <RetroInput placeholder="units" id="course_unit" type="text" className={styles.retro_input} value={course.unit} onChange={(e) => handleOnChange(e)}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.fourth}`}>
                <RetroInput placeholder="graded score" id="course_grade" type="text" className={styles.retro_input} value={course.grade} onChange={(e) => handleOnChange(e)}></RetroInput>
            </div>
        </RetroDiv>
    );
}