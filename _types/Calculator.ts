import { University } from "./Enums";
import { Course } from "./Course";

export interface Formula {
    university: University;
    getScore(courses: Course[]): string;
}


export class Calculator {
    private _formula: Formula;

    constructor(formula: Formula) {
        this._formula = formula;
    }

    getScore(courses: Course[]) {
        return this._formula.getScore(courses);
    }
}