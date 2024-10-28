import { Term } from "./Term";

export interface Course {
    id: string, // should be unique
    name: string,
    code: string,

    // Unit and Grade are initially strings that will be parsed into numbers
    // This is to combat formating issues such as periods
    unit: string,
    grade: string,

    // Tied to the term it is made in
    term_id: string,
}