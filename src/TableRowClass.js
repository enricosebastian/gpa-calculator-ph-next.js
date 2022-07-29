import React from 'react';

class TableRowClass extends React.Component {

    changeCourseName = (event) => {
        let newCourseName = event.target.value;
        this.props.changeCourseName(this.props.course.id, this.props.termNumber, newCourseName);
    };

    changeCourseGrade = (event) => {
        let newCourseGrade = event.target.value;
        newCourseGrade = isNaN(newCourseGrade) ? 0 : newCourseGrade;
        this.props.changeCourseGrade(this.props.course.id, this.props.termNumber, newCourseGrade);
    };

    changeCourseUnit = (event) => {
        let newCourseUnit = event.target.value;
        newCourseUnit = isNaN(newCourseUnit) ? 0 : newCourseUnit;
        this.props.changeCourseUnit(this.props.course.id, this.props.termNumber, newCourseUnit);
    };

    changeCourseCode = (event) => {
        let newCourseCode = event.target.value;
        this.props.changeCourseCode(this.props.course.id, this.props.termNumber, newCourseCode);
    };
    
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td><input onChange={this.changeCourseName} value={this.props.course.courseName}/></td>
                    <td><input onChange={this.changeCourseCode} value={this.props.course.courseCode}/></td>
                    <td><input onChange={this.changeCourseUnit} value={this.props.course.courseUnit}/></td>
                    <td><input onChange={this.changeCourseGrade} value={this.props.course.courseGrade}/></td>
                </tr>
            </React.Fragment>
        );
    }
};

export default TableRowClass;