import Course from "./Course";

export default interface Term {
    term_name: string;
    courses: Course[];
}