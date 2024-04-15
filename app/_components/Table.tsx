"use client";

import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";
import RowTitles from "./_table_components/RowTitles";
import RowInputs from "./_table_components/RowInputs";
import RowResults from "./_table_components/RowResults";

import InitializeData from "../_data/initialize";

import Term from "../_models/Term";
import Course from "../_models/Course";

import { useState, useReducer } from "react";

export default function Table() {
  const terms: Term[] = InitializeData();
  const [selectedTerm, setSelectedTerm] = useState(terms[0].name);

  function onDropdownChange(selected_term: string) {
    setSelectedTerm(selected_term);
  }

  function returnSelectedTerm(): Term {

    const data = terms.find(term => term.name === selectedTerm);

    if (data === undefined) {
      return {
        name: '',
        courses: [],
      };
    }

    if (terms.some(term => term.name === selectedTerm)) {
      return data;
    }

    return terms[0];
  }

  return (
      <table className="table-fixed">
        <thead>
          <DropdownMenuForTerms terms={terms} onDropdownChange={onDropdownChange}></DropdownMenuForTerms>
          <RowTitles></RowTitles>
        </thead>

        <tbody>
          <RowInputs term={returnSelectedTerm()}></RowInputs>
          
          <RowResults></RowResults>
        </tbody>
      </table>
  );
}