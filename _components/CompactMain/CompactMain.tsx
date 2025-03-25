import { Orientation } from "@/_types/Enums";
import { RetroDiv, RetroDivSubComponent, RetroDivButton } from "../RetroDiv/RetroDiv";
import RetroDropdown from "../RetroDropdown/RetroDropdown";
import { useMainContext } from "@/_context/MainContext";
import { useTermContext } from "@/_context/TermContext";
import { useCourseContext } from "@/_context/CourseContext";
import { MouseEventHandler, ReactNode } from "react";
import { Course } from "@/_types/Course";


export default function CompactMain() {
    const {selectedCourses, selectedTermId, setSelectedTermId} = useMainContext();
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, deleteCourse} = useCourseContext();

    const retroDivCourses = selectedCourses.map(course => <RetroDivCourse key={course.code} course={course}/>);

    return (
        <>
            <RetroDiv>
                <RetroDivSubComponent orientation={Orientation.TOP}>
                    <RetroDropdown><option>dlsu_gpa</option></RetroDropdown>
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