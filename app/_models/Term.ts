import Course from "./Course";

export default interface Term {
    id: string,
    name: string;
    courses?: Course[];
}