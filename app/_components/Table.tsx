"use client";

import DropdownMenuForTerms from "./_table_components/DropdownMenuForTerms";
import RowTitles from "./_table_components/RowTitles";
import RowInputs from "./_table_components/RowInputs";
import RowResults from "./_table_components/RowResults";

import InitializeData from "../_data/initialize";

import Term from "../_models/Term";
import Course from "../_models/Course";
import Action from "../_models/Action";

import { useState, useReducer } from "react";
import Data from "../_models/Data";

export default function Table() {
  const [terms, dispatch] = useReducer(termsReducer, InitializeData());
  const [selectedTerm, setSelectedTerm] = useState(terms[0].name);

  function termsReducer(terms: Term[], data: Data) {

    switch(data.action) {

      case Action.Add:
        if (selectedTerm === '') {
          console.log("Emtpy selected term error. Returning default terms");
          return terms;
        }

        if (data.new_course === null) {
          console.log("Course entry is empty!");
          return terms;
        }

        if (!terms.some(term => term.name === selectedTerm)) {
          console.log(`Term "${selectedTerm}" does not exist in any of the terms list. Returning default terms`);
          return terms;
        }

        const newTerms = terms.map(term => {
          if(term.name === selectedTerm) {

            const new_course: Course = {
              course_code: (data.new_course?.course_code) ? data.new_course.course_code : "",
              course_title: (data.new_course?.course_title) ? data.new_course.course_title : "",
              grade: (data.new_course?.grade) ? data.new_course.grade : 0.0,
              unit: (data.new_course?.unit) ? data.new_course.unit : 0.0,
            };

            const courses = [...term.courses, new_course];
            term.courses = courses;

            return term;
          }

          return term;
        });
        break;

      case Action.Modify:
        if (selectedTerm === '') {
          console.log("Emtpy selected term error. Returning default terms");
          return terms;
        }

        if (data.new_course === null) {
          console.log("Course entry is empty!");
          return terms;
        }

        if (!terms.some(term => term.name === selectedTerm)) {
          console.log(`Term "${selectedTerm}" does not exist in any of the terms list. Returning default terms`);
          return terms;
        }

        const newTerms2 = terms.map(term => {
          if(term.name === selectedTerm) {

            const modified_course: Course = {
              course_code: (data.new_course?.course_code) ? data.new_course.course_code : "",
              course_title: (data.new_course?.course_title) ? data.new_course.course_title : "",
              grade: (data.new_course?.grade) ? data.new_course.grade : 0.0,
              unit: (data.new_course?.unit) ? data.new_course.unit : 0.0,
            };

            const modified_courses = term.courses.map(course => {
              if (course.course_code === modified_course.course_code) {
                return modified_course;
              }

              return course;
            });

            term.courses = modified_courses;
            return term;
          }

          return term;
        });







    }


    return terms;
  }

  function handleAddCourse(new_course: Course) {
    dispatch({
      action: Action.Add,
      new_course: new_course,
    })
  }


  function onDropdownChange(selected_term: string) {
    setSelectedTerm(selected_term);
  }

  function returnSelectedTerm(): Term {
    const data: Term = Object.assign({}, terms.find(term => term.name === selectedTerm));

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
          <RowInputs term={returnSelectedTerm()} handleAddCourse={handleAddCourse}></RowInputs>
          
          <RowResults></RowResults>
        </tbody>
      </table>
  );
}