import { Action } from "@/_types/Enums";
import { Term } from "@/_types/Term";

export interface TermReducerPayload {
  action: Action,
  data: Term
}

export const termReducer = (state: Term[], payload: TermReducerPayload) => {
    const entered_term = payload.data;

    switch (payload.action) {
        case Action.ADD:
            const added_term: Term = {
                id: crypto.randomUUID(),
                name: entered_term.name,
            }
            
            return [...state, added_term];

        case Action.DELETE:
            return state.filter(term => term.id !== entered_term.id);
            
        case Action.MODIFY:
            const modified_term: Term = {
                id: entered_term.id,
                name: entered_term.name,
            }
            
            return state.map(term => term.id === modified_term.id ? modified_term : term);
    }
}