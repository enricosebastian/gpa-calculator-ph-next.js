import React from "react";
import TableRow from './TableRow';


class TableRows extends React.Component {
    render() {
        let tableRows = this.props.classes.map(
            c => < TableRow 
                    key={c.id}
                    selectedTerm={this.props.selectedTerm} 
                    class={c} 
                    changeCourseCode={this.props.changeCourseCode}
                    changeCourseUnit={this.props.changeCourseUnit}
                    changeCourseName={this.props.changeCourseName}
                    changeCourseGrade={this.props.changeCourseGrade} 
                    />
        );

        let totalCourseUnits = this.props.classes.map(c => parseFloat(c.courseUnit)).reduce((prevValue,currentValue) => prevValue + currentValue, 0);
        let totalGpaCourseUnits = this.props.classes.map(c => parseFloat(c.courseGrade)).reduce((prevValue,currentValue, index) => prevValue + (currentValue*this.props.classes.map(c => parseFloat(c.courseUnit))[index]), 0);
        let gpa = isNaN(totalGpaCourseUnits/totalCourseUnits) ? 0 : totalGpaCourseUnits/totalCourseUnits;
        return (
            <React.Fragment>
                <tbody>
                    {tableRows}
                    <tr>
                        <td colSpan="3">Term GPA</td>
                        <td>{gpa.toFixed(3)}</td>
                    </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default TableRows;