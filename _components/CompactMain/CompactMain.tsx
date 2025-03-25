import { Orientation, University } from "@/_types/Enums";
import { RetroDiv, RetroDivSubComponent, RetroDivButton } from "../RetroDiv/RetroDiv";
import RetroDropdown from "../RetroDropdown/RetroDropdown";
import { useMainContext } from "@/_context/MainContext";
import { useTermContext } from "@/_context/TermContext";
import { useCourseContext } from "@/_context/CourseContext";
import { ChangeEvent, MouseEventHandler, ReactNode } from "react";
import { Course } from "@/_types/Course";
import { useTheme } from "next-themes";


export default function CompactMain() {
    const {selectedCourses, selectedTermId, setSelectedTermId, university, setUniversity} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const {theme, setTheme} = useTheme();

    const colleges: string[] = Object.keys(University).filter(university => university !== 'NONE');
    const college_select_fields = colleges.map(college => <option key={college} value={college}>{college}</option>)

    const retroDivCourses = selectedCourses.map(course => <RetroDivCourse key={course.code} course={course}/>);

    const handleCollegeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const new_selected_university: University = e.target.value as University;
        
        if (!new_selected_university) {
            throw new Error('University does not exist!');
        }

        setTheme(new_selected_university);
        setUniversity(new_selected_university);
    };
    

    return (
        <>
            <RetroDiv>
                <RetroDivSubComponent orientation={Orientation.TOP}>
                    <RetroDropdown onChange={e => handleCollegeSelected(e)}>{college_select_fields}</RetroDropdown>
                </RetroDivSubComponent>

                <RetroDivSubComponent orientation={Orientation.BOTTOM}>
                    <RetroDropdown><option>term_1</option></RetroDropdown>
                </RetroDivSubComponent>


                <RetroDivButton orientation={Orientation.BOTTOM_LEFT}>+</RetroDivButton>
                <RetroDivButton orientation={Orientation.BOTTOM_RIGHT}>x</RetroDivButton>
            </RetroDiv>

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