import { Reducer, useReducer } from "react"
import Action from "./Action";
import starting_terms from "@/utils/TermSeeder";

export interface TermReducerPayload {
    action: Action,
    data: Term
}

const termReducer: Reducer<Term[], TermReducerPayload> = (current_terms_data: Term[], payload: TermReducerPayload) => {
  const entered_term: Term = payload.data;

  if (payload.action === Action.ADD) {
    const new_term: Term = {
      id: crypto.randomUUID(),
      name: entered_term.name,
    }

    return [...current_terms_data, new_term];
  }

  if (payload.action === Action.MODIFY) {
    const modified_term: Term = {
      id: entered_term.id,
      name: entered_term.name,
    }

    return current_terms_data.map(term => term.id === modified_term.id? modified_term : term);
  }

  if (payload.action === Action.DELETE) {
    return current_terms_data.filter(term => term.id !== entered_term.id);
  }

  // If none of the conditions are met, just return the old course data
  return current_terms_data;
}

export default termReducer;