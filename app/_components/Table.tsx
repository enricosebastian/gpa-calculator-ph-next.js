import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";
import RowTitles from "./_table_components/RowTitles";
import RowInputs from "./_table_components/RowInputs";
import RowResults from "./_table_components/RowResults";

import Term from "../_models/Term";
import Course from "../_models/Course";

function InitializeData(): Term[] {
  const demo_course: Course = {
    course_code: "GERPHIS",
    course_title: "Philippine History",
    grade: 3.5,
    unit: 3.0,
  }

  const courses: Course[] = [demo_course];

  const term_1: Term = {
    term_name: "term_1",
    courses: courses,
  };

  const terms: Term[] = [term_1];
  return terms;
}

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