import React, { Dispatch, createContext, ReactNode, useContext, useReducer, useEffect, useState, useRef } from "react";
import { termReducer, TermReducerPayload } from "@/_reducers/termReducer";
import { Term } from "@/_types/Term";
import initializeTerms from "@/_utils/initializeTerms";
import { Action } from "@/_types/Enums";
import { Course } from "@/_types/Course";
import { useTermContext } from "./TermContext";
import { useCourseContext } from "./CourseContext";

type MainContextProps = {
    selectedTermId: string,
    setSelectedTermId: React.Dispatch<React.SetStateAction<string>>,
    selectedCourses: Course[]
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

    // // Responsible for updating everything if we update the selected term
    // useEffect(() => {
    //     const new_selected_term = terms.find(term => term.id === selected_term.id);

    //     if (terms.length === 1) {
    //         setSelectedTerm(terms[0]);
    //     }

    //     if (!new_selected_term) {
    //         throw new Error('This term does not exist!');
    //     }
        
    //     setSelectedTerm(new_selected_term);

    // }, [terms]);

    return (
        <MainContext.Provider value={{selectedTermId: selected_term_id, setSelectedTermId: setSelectedTermId, selectedCourses: selected_courses}}>
            {children}
        </MainContext.Provider>
    );
};

