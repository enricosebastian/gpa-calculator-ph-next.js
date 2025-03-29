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

    if (course === undefined) {
        return <></>;
    }

    return (
        <RetroDiv className={`${props.className} ${styles.course_container}`} style={{height: 100, marginBottom: 50}}>
            <RetroDivButton orientation={Orientation.TOP_RIGHT} onClick={() => handleDelete(course)}>x</RetroDivButton>

            <div className={`${styles.content} ${styles.first}`}>
                <RetroInput type="text" className={styles.retro_input}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.second}`}>
                <RetroInput type="text" className={styles.retro_input}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.third}`}>
                <RetroInput type="text" className={styles.retro_input}></RetroInput>
            </div>

            <div className={`${styles.content} ${styles.fourth}`}>
                <RetroInput type="text" className={styles.retro_input}></RetroInput>
            </div>
        </RetroDiv>
    );
}