import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";
import RowTitles from "./_table_components/RowTitles";
import RowInputs from "./_table_components/RowInputs";
import RowResults from "./_table_components/RowResults";

import InitializeData from "../_data/initialize";

import Term from "../_models/Term";
import Course from "../_models/Course";

import { useState } from "react";

export default function Table() {
  
  const terms: Term[] = InitializeData();

  return (
      <table className="table-fixed">
        <thead>
          <DropdownMenuForTerms></DropdownMenuForTerms>
          <RowTitles></RowTitles>
        </thead>

        <tbody>
          <RowInputs></RowInputs>
          
          <RowResults></RowResults>
        </tbody>
      </table>
  );
}