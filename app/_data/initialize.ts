import Term from "../_models/Term";
import Course from "../_models/Course";

export default function InitializeData(): Term[] {
    const demo_course: Course = {
        course_code: "GERPHIS",
        course_title: "Philippine History",
        grade: 3.5,
        unit: 3.0,
    }

    const term_1_courses: Course[] = [demo_course];

    const term_1: Term = {
        name: "term_1",
        courses: term_1_courses,
    };

    const terms: Term[] = [term_1];

    for(let i = 2; i < 13; i++) {
        const term_name = `term_${i}`;

        const term_item: Term = {
            name: term_name,
            courses: [],
        }
        
        terms.push(term_item);
    }

    
    return terms;
}