import { useCourseContext } from "@/_context/CourseContext";
import { useTermContext } from "@/_context/TermContext";
import { Term } from "@/_types/Term";
import Table from "./Table/Table";
import Toolbar from "./Toolbar/Toolbar";
import { Course } from "@/_types/Course";
import { useEffect, useState } from "react";
import React, { Dispatch, createContext, ReactNode, useContext, useReducer } from "react";

type MainContextProps = {
    selected_term: Term,
    selected_courses: Course[],
    handleSelectTerm: (id: string) => void,
};

export const MainContext = createContext<MainContextProps | null>(null);

export default function Main() {
    const {terms, addTerm, modifyTerm, deleteTerm} = useTermContext();
    const {courses, addCourse, modifyCourse, deleteCourse} = useCourseContext();    

    const [selected_term, setSelectedTerm] = useState<Term>(terms[0]);
    const selected_courses: Course[] = courses.filter(course => course.term_id === selected_term.id); 

    const handleSelectTerm = (id: string) => {
        const new_selected_term = terms.find(term => term.id === id);

        if (new_selected_term === undefined)
            return;

        setSelectedTerm(new_selected_term);
    }
    
    useEffect(() => {
        const new_selected_term = terms.find(term => term.id === selected_term.id);
        
        if (new_selected_term === undefined)
            return;

        setSelectedTerm(new_selected_term);
    }, [terms]);

    return (
        <MainContext.Provider value={{selected_term: selected_term, selected_courses: selected_courses, handleSelectTerm: handleSelectTerm}}>
            <Toolbar selected_term={selected_term}></Toolbar>
            <Table courses={selected_courses} handleModifyCourse={modifyCourse} handleDeleteCourse={deleteCourse}></Table>
        </MainContext.Provider>
    );
}