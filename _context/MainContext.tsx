import React, { Dispatch, createContext, ReactNode, useContext, useReducer, useEffect, useState, useRef } from "react";
import { termReducer, TermReducerPayload } from "@/_reducers/termReducer";
import { Term } from "@/_types/Term";
import initializeTerms from "@/_utils/initializeTerms";
import { Action, University } from "@/_types/Enums";
import { Course } from "@/_types/Course";
import { useTermContext } from "./TermContext";
import { useCourseContext } from "./CourseContext";

type MainContextProps = {
    university: University,
    selectedTermId: string,
    setSelectedTermId: React.Dispatch<React.SetStateAction<string>>,
    selectedCourses: Course[],
};

export const MainContext = createContext<MainContextProps | null>(null);

export const useMainContext = () => {
    const context = useContext(MainContext);

    if (!context) {
        throw new Error('Main context does not exist!');
    }
    
    return context;
}

export const MainContextProvider = ({children}: {children: ReactNode}) => {
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, modifyCourse, deleteCourse} = useCourseContext();
    const [selected_term_id, setSelectedTermId] = useState<string>(terms[0].id);
    const selected_courses = courses.filter(course => course.term_id === selected_term_id);
    const [gpa, setGpa] = useState<string>('0');
    const [cgpa, setCgpa] = useState<string>('0');
    const [university, setUniversity] = useState<University>(University.NONE);

    return (
        <MainContext.Provider value={{selectedTermId: selected_term_id, setSelectedTermId: setSelectedTermId, selectedCourses: selected_courses, university: university}}>
            {children}
        </MainContext.Provider>
    );
};

