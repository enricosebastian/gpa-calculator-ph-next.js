import React from "react";

class TableRow extends React.Component {

    changeCourseCode = (event) => {
        let newCourseCode = event.target.value;
        this.props.changeCourseCode(this.props.class.id, this.props.selectedTerm, newCourseCode);
    };

    changeCourseName = (event) => {
        let newCourseName = event.target.value;
        this.props.changeCourseName(this.props.class.id, this.props.selectedTerm, newCourseName);
    };

    changeCourseUnit = (event) => {
        let newCourseUnit = event.target.value;
        this.props.changeCourseUnit(this.props.class.id, this.props.selectedTerm, newCourseUnit);
    };

    changeCourseGrade = (event) => {
        let newCourseGrade = event.target.value;
        this.props.changeCourseGrade(this.props.class.id, this.props.selectedTerm, newCourseGrade);
    };

    render() {
        return (
            <tr>
                <td>
                    <input onChange={this.changeCourseCode} value={this.props.class.courseCode} />
                </td>
                <td>
                    <input onChange={this.changeCourseName} value={this.props.class.courseName} />
                </td>
                <td>
                    <input onChange={this.changeCourseUnit} value={this.props.class.courseUnit} />
                </td>
                <td>
                    <input onChange={this.changeCourseGrade} value={this.props.class.courseGrade} />
                </td>
            </tr>
        );
    
    }

}

export default TableRow;