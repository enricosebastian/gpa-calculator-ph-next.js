import React, { Dispatch, createContext, ReactNode, useContext, useReducer, useEffect, useState, useRef } from "react";
import { termReducer, TermReducerPayload } from "@/_reducers/termReducer";
import { Term } from "@/_types/Term";
import initializeTerms from "@/_utils/initializeTerms";
import { Action } from "@/_types/Enums";
import { Course } from "@/_types/Course";
import { useTermContext } from "./TermContext";
import { useCourseContext } from "./CourseContext";

type MainContextProps = {
    selectedTerm: Term,
    setSelectedTerm: React.Dispatch<React.SetStateAction<Term>>,
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
    const [selected_term, setSelectedTerm] = useState<Term>(terms[0]);
    const selected_courses = courses.filter(course => course.term_id === selected_term.id);
    
    // Responsible for updating everything if we update the selected term
    useEffect(() => {
        const new_selected_term = terms.find(term => term.id === selected_term.id);

        if (!new_selected_term) {
            throw new Error('This term does not exist!');
        }
        
        setSelectedTerm(new_selected_term);
    }, [terms]);

    return (
        <MainContext.Provider value={{selectedTerm: selected_term, setSelectedTerm: setSelectedTerm, selectedCourses: selected_courses}}>
            {children}
        </MainContext.Provider>
    );
};

