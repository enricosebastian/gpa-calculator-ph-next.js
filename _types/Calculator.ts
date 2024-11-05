import { University } from "./Enums";
import { Course } from "./Course";

export interface Formula {
    university: University;
    getGpa(courses: Course[]): string;
    getCgpa(course: Course[]): string;
}


export class Calculator {
    private _formula: Formula;

    constructor(formula: Formula) {
        this._formula = formula;
    }

    getGpa(courses: Course[]) {
        return this._formula.getGpa(courses);
    }

    getCgpa(courses: Course[]) {
        return this._formula.getCgpa(courses);
    }
}