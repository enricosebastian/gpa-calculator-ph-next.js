import React, { Dispatch, createContext, ReactNode, useContext, useReducer } from "react";
import { termReducer, TermReducerPayload } from "@/_reducers/termReducer";
import { Term } from "@/_types/Term";
import initializeTerms from "@/_utils/initializeTerms";
import { Action } from "@/_types/Enums";

type TermContextProps = {
    terms: Term[],
    addTerm: (term: Term) => void,
    modifyTerm: (term: Term) => void;
    deleteTerm: (term: Term) => void;
};

export const TermContext = createContext<TermContextProps | null>(null);

export const useTermContext = () => {
    const context = useContext(TermContext);

    if (!context) {
        throw new Error('Course context does not exist!');
    }

    return context;
}

export const TermContextProvider = ({children}: {children: ReactNode}) => {
    const [terms, termDispatch] = useReducer(termReducer, initializeTerms());

    const addTerm = (term: Term) => {
        termDispatch({action: Action.ADD, data: term});
    }

    const modifyTerm = (term: Term) => {
        termDispatch({action: Action.MODIFY, data: term});
    }

    const deleteTerm = (term: Term) => {
        termDispatch({action: Action.DELETE, data: term});
    }

    return (
        <TermContext.Provider value={{terms: terms, addTerm, modifyTerm, deleteTerm}}>
            {children}
        </TermContext.Provider>
    );
};

