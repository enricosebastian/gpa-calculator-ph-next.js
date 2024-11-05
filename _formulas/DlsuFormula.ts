import { Formula } from "@/_types/Calculator";
import { Course } from "@/_types/Course";
import { University } from "@/_types/Enums";

export class DlsuFormula implements Formula {
    university: University = University.DLSU;

    getGpa(courses: Course[]): string {
        let sum_of_units: number = 0;
        let sum_of_gradeunits: number = 0;
        let gpa: number = 0;

        courses.forEach(course => {
            if (course.grade.trim() === '') {
                course.grade = '0';
            }

            if (course.unit.trim() === '') {
                course.unit = '0';
            }

            const grade: number = Number(course.grade);
            const unit: number = Number(course.unit);

            sum_of_units += unit;
            sum_of_gradeunits += grade*unit;
        });

        gpa = sum_of_gradeunits/sum_of_units;
        return `${gpa.toFixed(4)}`;
    }
    
    getCgpa(course: Course[]): string {
        throw new Error("Method not implemented.");
    }

}