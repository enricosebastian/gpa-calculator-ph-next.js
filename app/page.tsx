'use client';

import Table from '@/components/Table/Table';
import starting_courses from '@/utils/CourseSeeder';
import starting_terms from '@/utils/TermSeeder';

import { useReducer, useState } from 'react';

import courseReducer, { CourseReducerData, CourseReducerPayload } from '@/types/CourseReducer';
import termReducer, {TermReducerPayload} from '@/types/TermReducer';
import Action from '@/types/Action';

export default function Home() {
  // Initialize the courses
  const [courses, coursesDispatch] = useReducer(courseReducer, starting_courses);

  // Initialize the terms
  const [terms, termsDispatch] = useReducer(termReducer, starting_terms);
  
  // Make sure you initialize the selected term on page load
  const [selectedTerm, setSelectedTerm] = useState<Term>(terms[0]);

  const dropdown_items = terms.map(term => <option key={term.id} value={term.id}>{term.name}</option>) 

  const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected_term_id = e.target.value;

    // Make sure the term ID is actually in the list of existing terms
    if (!terms.some(term => term.id === selected_term_id)) {
      throw Error('Term in the select dropdown does not exist!');
    }

    const selected_term = terms.find(term => term.id === selected_term_id);

    if (selected_term === undefined) {
      return;
    }

    setSelectedTerm(selected_term);
  }

  const handleModifyCourse = (modified_course: Course) => {
    const data: CourseReducerData = {
      course: modified_course,
      selected_term: modified_course.term // The term they are assigned to
    };

    const payload: CourseReducerPayload = {
      action: Action.MODIFY,
      data: data,
    };

    coursesDispatch(payload);
  }

  const handleDeleteCourse = (deleted_course: Course) => {
    const data: CourseReducerData = {
      course: deleted_course,
      selected_term: deleted_course.term // The term they are assigned to
    };

    const payload: CourseReducerPayload = {
      action: Action.DELETE,
      data: data,
    };

    coursesDispatch(payload);
  }

  const handleAddEmptyCourse = () => {
    const empty_course: Course = {
      id: crypto.randomUUID(),
      name: '',
      grade: '',
      unit: '0.0',
      code: '0.0',
      term: selectedTerm
    }

    const data: CourseReducerData = {
      course: empty_course,
      selected_term: selectedTerm // The term currently active in UI
    };

    const payload: CourseReducerPayload = {
      action: Action.ADD,
      data: data,
    };

    coursesDispatch(payload);
  }

  const handleModifyTermName = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const modified_term: Term = {
      id: selectedTerm.id,
      name: e.target.value
    };

    const payload: TermReducerPayload = {
      action: Action.MODIFY,
      data: modified_term,
    };

    termsDispatch(payload);
    setSelectedTerm(modified_term);
    
  }

  return (
    <div>
      <div>

        <select onChange={(e) => handleSelectOnChange(e)}>
          {dropdown_items}
        </select>

        <button>Add Term</button>
        <button onClick={handleAddEmptyCourse}>Add Course</button>

      </div>
      
      <div>
        <input onChange={e => handleModifyTermName(e)} value={selectedTerm.name}></input>
      </div>

      <div>
        <Table courses={courses.filter(course => course.term.id === selectedTerm.id)} handleAddCourse={handleAddEmptyCourse} handleModifyCourse={handleModifyCourse} handleDeleteCourse={handleDeleteCourse}/>
      </div>
      
    </div>
  );
}
