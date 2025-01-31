import { Formula } from "@/_types/Calculator";
import { Course } from "@/_types/Course";
import { University } from "@/_types/Enums";

export class AdmuFormula implements Formula {
    university: University = University.DLSU;

    getScore(courses: Course[]): string {
        let sum_of_units: number = 0;
        let sum_of_gradeunits: number = 0;
        let gpa: number = 0;

        courses.forEach(course => {
            const grade: number = `${course.grade}`.trim() === '' ? 0 : Number(course.grade);
            const unit: number = `${course.unit}`.trim() === '' ? 0 : Number(course.unit);

            sum_of_units += unit;
            sum_of_gradeunits += grade*unit;
        });

        if (sum_of_units !== 0)
            gpa = sum_of_gradeunits/sum_of_units;
        
        return `${gpa.toFixed(4)}`;
    }

    // For dean's lister status
    getTermStanding(courses: Course[]): string {
        const gpa = Number.parseFloat(this.getScore(courses));

        let message = '';

        if (gpa >= 3.4) {
            message = 'Firstest Dean\'s lister';
        } else if (gpa >= 3.0) {
            message = 'Secondest Dean\'s lister';
        }

        return message;
    }

    // For Latin honors
    getOverallStanding(courses: Course[]): string {
        const cgpa = Number.parseFloat(this.getScore(courses));

        let message = '';

        if (cgpa >= 3.8) {
            message = 'Summam Cum Luade';
        } else if (cgpa >= 3.6) {
            message = 'Magnaa Cum Laude';
        } else if (cgpa >= 3.4) {
            message = 'Cummmm Laude';
        } else if (cgpa >= 3.2) {
            message = 'Honorable1 Mention';
        }

        return message;
    }
}