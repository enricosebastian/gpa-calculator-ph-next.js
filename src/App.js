import React from 'react';
import {v4 as uuidv4} from 'uuid';

import Title from './Title';
import TermSelectorButtons from './TermSelectorButtons';
import AddTermButton from './AddTermButton';
import Content from './Content';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            terms: [{termNumber: 1, classes: [{id: uuidv4(), courseName: "History", courseCode: "GERPHIS", courseUnit: 3.0, courseGrade: 3.5}, {id: uuidv4(), courseName: "Science and Tech", courseCode: "GESTSOC", courseUnit: 3.0, courseGrade: 3.5}], gpa: 0.0, isChecked: true}, 
                    {termNumber: 2, classes: [{id: uuidv4(), courseName: "General Filipino", courseCode: "GEFILI", courseUnit: 3.0, courseGrade: 2.5}], gpa: 0.0, isChecked: true}, 
                    {termNumber: 3, classes: [{id: uuidv4(), courseName: "Thesis 1", courseCode: "THSEC1B", courseUnit: 1.0, courseGrade: 4.0}, {id: uuidv4(), courseName: "Dance", courseCode: "GEDANCE", courseUnit: 2.0, courseGrade: 4.0}, {id: uuidv4(), courseName: "Individual Sports", courseCode: "GESPORTS", courseUnit: 2.0, courseGrade: 3.5}], gpa: 0.0, isChecked: true}],
            cgpa: 0,
            selectedTerm: 1
        };
    }

    addTerm = () => {
        this.setState((prevState) => ({
            terms: [...prevState.terms, {termNumber: prevState.terms.length+1, classes: [{id: 0, courseName: "", courseCode: "", courseUnit: 0, courseGrade: 0}], gpa: 0.0, isChecked: false}]
        }));
    };

    addClass = (termNumber) => {
        this.setState((prevState) => ({
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, classes: [...t.classes, {id: uuidv4(), courseName: "", courseCode: "", courseUnit: 0, courseGrade: 0}]} : t)
        }));
    };

    changeIsChecked = (termNumber) => {
        this.setState((prevState)=>({
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, isChecked: !t.isChecked}: t)
        }));
    }

    changeSelectedTerm = (newSelectedTerm) => {
        this.setState(() => ({
            selectedTerm: newSelectedTerm
        }));
    };

    changeCourseCode = (classId, termNumber, newCourseCode) => {
        this.setState((prevState) => ({
            ...prevState,
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, classes: t.classes.map(c => c.id === classId ? {...c, courseCode: newCourseCode} : c)} : t)
        }));
    };

    changeCourseUnit = (classId, termNumber, newCourseUnit) => {
        this.setState((prevState) => ({
            ...prevState,
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, classes: t.classes.map(c => c.id === classId ? {...c, courseUnit: newCourseUnit} : c)} : t)
        }));
    };

    changeCourseGrade = (classId, termNumber, newCourseGrade) => {
        this.setState((prevState) => ({
            ...prevState,
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, classes: t.classes.map(c => c.id === classId ? {...c, courseGrade: newCourseGrade} : c)} : t)
        }));
    };

    changeCourseName = (classId, termNumber, newCourseName) => {
        this.setState((prevState) => ({
            ...prevState,
            terms: prevState.terms.map(t => t.termNumber === termNumber ? {...t, classes: t.classes.map(c => c.id === classId ? {...c, courseName: newCourseName} : c)} : t)
        }));
    };

    render() {
        return (
            <React.Fragment>
                <Title/>
                <TermSelectorButtons 
                    terms={this.state.terms} 
                    selectedTerm={this.state.selectedTerm} 
                    changeSelectedTerm={this.changeSelectedTerm}
                />
                <AddTermButton addTerm={this.addTerm}/>
                < Content 
                    classes={this.state.terms.find(t => (t.termNumber === this.state.selectedTerm)).classes} 
                    selectedTerm={this.state.selectedTerm} 
                    addClass={this.addClass}
                    changeCourseCode={this.changeCourseCode}
                    changeCourseUnit={this.changeCourseUnit}
                    changeCourseName={this.changeCourseName}
                    changeCourseGrade={this.changeCourseGrade}
                    changeIsChecked={this.changeIsChecked}
                    terms={this.state.terms}
                />
            </React.Fragment>
        );
    }
}

export default App;