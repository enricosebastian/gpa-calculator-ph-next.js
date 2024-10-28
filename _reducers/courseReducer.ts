import { Course } from "@/_types/Course";
import { Action } from "@/_types/Enums";

export interface CourseReducerPayload {
  action: Action,
  data: Course
}

export const courseReducer = (state: Course[], payload: CourseReducerPayload) => {
    const entered_course = payload.data;

    switch (payload.action) {
        case Action.ADD:
            const added_course: Course = {
                id: crypto.randomUUID(),
                name: entered_course.name,
                grade: entered_course.grade,
                code: entered_course.code,
                unit: entered_course.unit,
                term: entered_course.term,
            }
            
            return [...state, added_course];

        case Action.DELETE:
            return state.filter(course => course.id !== entered_course.id);
            
        case Action.MODIFY:
            const modified_course: Course = {
                id: entered_course.id,
                name: entered_course.name,
                grade: entered_course.grade,
                code: entered_course.code,
                unit: entered_course.unit,
                term: entered_course.term,
            }
            
            return state.map(course => course.id === modified_course.id ? modified_course : course);
    }
}