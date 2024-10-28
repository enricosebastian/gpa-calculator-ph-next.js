import React, { Dispatch, createContext, ReactNode, useContext, useReducer } from "react";
import { Course } from "@/_types/Course";
import { courseReducer, CourseReducerPayload } from "@/_reducers/courseReducer";
import initializeCourses from "@/_utils/initializeCourses";
import { Action } from "@/_types/Enums";

type CourseContextProps = {
    courses: Course[],
    addCourse: (course: Course) => void,
    modifyCourse: (course: Course) => void;
    deleteCourse: (course: Course) => void;
};

export const CourseContext = createContext<CourseContextProps | null>(null);

export const useCourseContext = () => {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error('Course context does not exist!');
    }

    return context;
}

export const CourseContextProvider = ({children}: {children: ReactNode}) => {
    const [courses, courseDispatch] = useReducer(courseReducer, initializeCourses());

    const addCourse = (course: Course) => {
        courseDispatch({action: Action.ADD, data: course});
    }

    const modifyCourse = (course: Course) => {
        courseDispatch({action: Action.MODIFY, data: course});
    }

    const deleteCourse = (course: Course) => {
        courseDispatch({action: Action.DELETE, data: course});
    }

    return (
        <CourseContext.Provider value={{courses, addCourse, modifyCourse, deleteCourse}}>
            {children}
        </CourseContext.Provider>
    );
};

