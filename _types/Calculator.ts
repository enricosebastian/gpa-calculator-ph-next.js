import { University } from "./Enums";
import { Course } from "./Course";
import { DlsuFormula } from "@/_formulas/DlsuFormula";
import { AdmuFormula } from "@/_formulas/AdmuFormula";

export interface Formula {
    university: University;
    getScore(courses: Course[]): string;
    getTermStanding(courses: Course[]): string;
    getOverallStanding(courses: Course[]): string;
}


export class Calculator {
    private _formula: Formula;

    constructor(university: University) {
        console.log(university);

        switch (university) {
            case University.DLSU:
                this._formula = new DlsuFormula();
                break;
            case University.ADMU:
                this._formula = new AdmuFormula();
                break;
            case University.UST:
                this._formula = new DlsuFormula();
                break;
            default:
                throw new Error('University does not exist!');
        }
    }

    getScore(courses: Course[]) {
        return this._formula.getScore(courses);
    }

    getTermStanding(courses: Course[]) {
        return this._formula.getTermStanding(courses);
    }

    getOverallStanding(courses: Course[]) {
        return this._formula.getOverallStanding(courses);
    }
}