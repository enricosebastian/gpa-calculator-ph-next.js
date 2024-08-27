import { Reducer, useReducer } from "react"
import Action from "./Action"

export interface CourseReducerData {
  course: Course,
  selected_term: Term,
}

export interface CourseReducerPayload {
  action: Action,
  data: CourseReducerData
}

const courseReducer: Reducer<Course[], CourseReducerPayload> = (current_courses: Course[], payload: CourseReducerPayload) => {
  const entered_course: Course = payload.data.course;
  const selected_term: Term = payload.data.selected_term;

  if (payload.action === Action.ADD) {
    const new_course: Course = {
      id: crypto.randomUUID(),
      name: entered_course.name,
      grade: entered_course.grade,
      code: entered_course.code,
      unit: entered_course.unit,
      term: selected_term,
    }

    return [...current_courses, new_course];
  }

  if (payload.action === Action.MODIFY) {
    const modified_course: Course = {
      id: entered_course.id,
      name: entered_course.name,
      grade: entered_course.grade,
      code: entered_course.code,
      unit: entered_course.unit,
      term: entered_course.term
    }

    return current_courses.map(course => course.id === modified_course.id ? modified_course : course);
  }

  if (payload.action === Action.DELETE) {
    return current_courses.filter(course => course.id !== entered_course.id);
  }

  // If none of the conditions are met, just return the old course data
  return current_courses;
}

export default courseReducer;