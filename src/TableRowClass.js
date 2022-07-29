import React from 'react';


class TableRowClass extends React.Component {

    changeCourseName = (event) => {
        let newCourseName = event.target.value;
        this.props.changeCourseName(this.props.course.id, this.props.termNumber, newCourseName);
    };

    changeCourseGrade = (event) => {
        let newCourseGrade = event.target.value;
        this.props.changeCourseGrade(this.props.course.id, this.props.termNumber, newCourseGrade);
    };

    changeCourseUnit = (event) => {
        let newCourseUnit = event.target.value;
        this.props.changeCourseUnit(this.props.course.id, this.props.termNumber, newCourseUnit);
    };

    changeCourseCode = (event) => {
        let newCourseCode = event.target.value;
        this.props.changeCourseCode(this.props.course.id, this.props.termNumber, newCourseCode);
    };
    
    render() {
        return (
            <React.Fragment>
                <input onChange={this.changeCourseName} value={this.props.course.courseName}/>
                <input onChange={this.changeCourseCode} value={this.props.course.courseCode}/>
                <input onChange={this.changeCourseUnit} value={this.props.course.courseUnit}/>
                <input onChange={this.changeCourseGrade} value={this.props.course.courseGrade}/>
                <br/>
            </React.Fragment>
        );
    }
};

export default TableRowClass;