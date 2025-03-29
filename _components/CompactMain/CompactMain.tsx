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


export default function CompactMain() {
    const {selectedCourses, selectedTermId, setSelectedTermId, university, setUniversity} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const {theme, setTheme} = useTheme();

    const colleges: string[] = Object.keys(University).filter(university => university !== 'NONE');
    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)
    const term_select_fields = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>);

    const retroDivCourses = selectedCourses.map(course => <RetroDivCourse key={course.code} course={course}/>);

    const my_calculator = new Calculator(university);

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
                <RetroButton>Add a course</RetroButton>
            </div>
            

            {retroDivCourses}
        </>
    );

}

interface RetroDivCourseProps {
    course?: Course,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
}


function RetroDivCourse({course, ...props}: RetroDivCourseProps) {
    return (
        <RetroDiv className={props.className} style={{height: 100, marginBottom: 50}}>
            <RetroDivButton orientation={Orientation.TOP_RIGHT}>x</RetroDivButton>

            {course?.code}
        </RetroDiv>
    );
}