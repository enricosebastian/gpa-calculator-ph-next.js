import { Formula } from "@/_types/Calculator";
import { Course } from "@/_types/Course";
import { University } from "@/_types/Enums";

export class DlsuFormula implements Formula {
    university: University = University.DLSU;

    getScore(courses: Course[]): string {
        let sum_of_units: number = 0;
        let sum_of_gradeunits: number = 0;
        let gpa: number = 0;

        courses.forEach(course => {
            const grade: number = course.grade.trim() === '' ? 0 : Number(course.grade);
            const unit: number = course.unit.trim() === '' ? 0 : Number(course.unit);

            sum_of_units += unit;
            sum_of_gradeunits += grade*unit;
        });

        if (sum_of_units !== 0)
            gpa = sum_of_gradeunits/sum_of_units;
        
        return `${gpa.toFixed(4)}`;
    }
}