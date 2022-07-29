import React from 'react';
import TableRowClass from './TableRowClass';

class TableClass extends React.Component {

    addClass = () => {
        this.props.addClass(this.props.termNumber);
    }

    render() {
        let tableRowClass = this.props.classes.map(c => <TableRowClass key={"TableRowClass_"+c.id} course={c} termNumber={this.props.termNumber} changeCourseName={this.props.changeCourseName} changeCourseCode={this.props.changeCourseCode} changeCourseUnit={this.props.changeCourseUnit} changeCourseGrade={this.props.changeCourseGrade}/>);
        let totalCourseUnits = this.props.classes.map(c => parseFloat(c.courseUnit)).reduce((prevValue,currentValue) => prevValue + currentValue, 0);
        let gpa = this.props.classes.map(c => parseFloat(c.courseGrade)).reduce((prevValue,currentValue) => prevValue + currentValue, 0);
        return(
            <React.Fragment>
                {tableRowClass}
                total unit: {totalCourseUnits}
                <br/>
                gpa: {gpa}
                
                <br/>
                <button onClick={this.addClass}>add</button>
            </React.Fragment>
        );
    }

}

export default TableClass;