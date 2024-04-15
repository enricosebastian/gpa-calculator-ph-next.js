import Term from "../_models/Term";
import Course from "../_models/Course";

export default function InitializeData(): Term[] {
    const history_course: Course = {
        course_code: "GERPHIS",
        course_title: "Philippine History",
        grade: 3.5,
        unit: 3.0,
    };

    const coding_course: Course = {
        course_code: "CCPROG1",
        course_title: "Programming 1",
        grade: 3.0,
        unit: 3.0,
    };

    const electronics_course: Course = {
        course_code: "TRONIC2",
        course_title: "Electronics 2",
        grade: 2.5,
        unit: 3.0,
    };

    const physics_course: Course = {
        course_code: "ENGPHYS",
        course_title: "Engineering Physics",
        grade: 1.5,
        unit: 3.0,
    }

    const term_1_courses: Course[] = [history_course, coding_course, electronics_course];
    const term_1: Term = {
        name: "term_1",
        courses: [history_course, coding_course, electronics_course],
    };

    const term_2_courses: Course[] = [physics_course];
    const term_2: Term = {
        name: "term_2",
        courses: [physics_course],
    };

    const terms: Term[] = [term_1, term_2];

    for(let i = 3; i < 13; i++) {
        const term_name = `term_${i}`;

        const term_item: Term = {
            name: term_name,
            courses: [],
        }
        
        terms.push(term_item);
    }

    
    return terms;
}