import React from 'react';
import TableRowClass from './TableRowClass';
import GradesRowClass from './GradesRowClass';

class TableClass extends React.Component {

    addClass = () => {
        this.props.addClass(this.props.termNumber);
    }

    render() {
        let tableRowClass = this.props.classes.map(c => <TableRowClass key={"TableRowClass_"+c.id} course={c} termNumber={this.props.termNumber} changeCourseName={this.props.changeCourseName} changeCourseCode={this.props.changeCourseCode} changeCourseUnit={this.props.changeCourseUnit} changeCourseGrade={this.props.changeCourseGrade}/>);
        let totalCourseUnits = this.props.classes.map(c => parseFloat(c.courseUnit)).reduce((prevValue,currentValue) => prevValue + currentValue, 0);
        let totalGpaUnits = this.props.classes.map(c => parseFloat(c.courseGrade)).reduce((prevValue,currentValue, index) => prevValue + (currentValue*this.props.classes.map(c => parseFloat(c.courseUnit))[index]), 0);
        let gpa = isNaN(totalGpaUnits/totalCourseUnits) ? 0 : totalGpaUnits/totalCourseUnits;
        return(
            <React.Fragment>
                <table className="table">
                    <tr>
                        <th>Course name</th>
                        <th>Course code</th>
                        <th>Units</th>
                        <th>Grades</th>
                    </tr>
                    {tableRowClass}
                    <GradesRowClass gpa={gpa}/>
                </table>
                <br/>
                <button onClick={this.addClass}>Add a new course</button>
            </React.Fragment>
        );
    }

}

export default TableClass;