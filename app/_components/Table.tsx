"use client";

import {v4 as uuid} from 'uuid';

import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";
import HeaderTitlesRow from "./_table_components/HeaderTitlesRow";
import CoursesRow from "./_table_components/CoursesRow";
import GradesRow from "./_table_components/GradesRow";

import InitializeData from "../_services/InitializationService";

import Term from "../_models/Term";
import Course from "../_models/Course";
import Action from "../_models/Action";

import { useState, useReducer } from "react";
import Data from "../_models/Data";
import InitializationService from "../_services/InitializationService";

export default function Table() {
  const [terms, dispatch] = useReducer(termsReducer, InitializationService.getInstance().initializeTerms());
  const [selectedTermId, setSelectedTermId] = useState(terms[0].id);

  function termsReducer(terms: Term[], data: Data) {

    if (selectedTermId === '' || !terms.some(term => term.name === selectedTermId))
      throw new Error("Cannot add new course to a term that does not exist");

    if (!data.course)
      throw new Error("Cannot add new course since it's null");


    switch(data.action) {
      case Action.Add:
        return terms.map(term => {
          if(term.name === selectedTermId) {

            // Create new course entry
            const new_course: Course = {
              id: uuid(),
              course_code: (data.course?.course_code) ? data.course.course_code : "",
              course_title: (data.course?.course_title) ? data.course.course_title : "",
              grade: (data.course?.grade) ? data.course.grade : 0.0,
              unit: (data.course?.unit) ? data.course.unit : 0.0,
            };

            const courses = [...term.courses, new_course];
            term.courses = courses;

            return term;
          }

          return term;
        });

      case Action.Modify:
        return terms.map(term => {
          if(term.name === selectedTermId) {

            const modified_course: Course = {
              id: data.course.id,
              course_code: data.course.course_code,
              course_title: data.course.course_title,
              grade: (data.course?.grade)? data.course.grade : 0.0,
              unit: (data.course?.unit)? data.course.unit : 0.0,
            };

            const modified_courses = term.courses.map(course => {
              if (course.id === modified_course.id) {
                return modified_course;
              }

              return course;
            });

            term.courses = modified_courses;
            return term;
          }

          return term;
        });

      default:
        return terms;
    }
  }

  function handleAddCourse(new_course: Course) {
    dispatch({
      action: Action.Add,
      course: new_course,
    });
  }

  function handleModifyCourse(modified_course: Course) {
    dispatch({
      action: Action.Modify,
      course: modified_course,
    });
  }


  function onDropdownChange(selected_term_id: string) {
    setSelectedTermId(selected_term_id);
  }

  function returnSelectedTerm(): Term {
    const data: Term = Object.assign({}, terms.find(term => term.id === selectedTermId));

    if (data === undefined)
      throw new Error("The term selected doesn't exist!");

    if (terms.some(term => term.id === selectedTermId))
      return data;


    // Else, return just the first term by default
    return structuredClone(terms[0]);
  }

  return (
      <table className="table-fixed">
        <thead>
          <DropdownMenuForTerms terms={terms} onDropdownChange={onDropdownChange}></DropdownMenuForTerms>
          <HeaderTitlesRow></HeaderTitlesRow>
        </thead>

        <tbody>
          <CoursesRow term={returnSelectedTerm()} handleAddCourse={handleAddCourse}></CoursesRow>
          
          <GradesRow></GradesRow>
        </tbody>
      </table>
  );
}