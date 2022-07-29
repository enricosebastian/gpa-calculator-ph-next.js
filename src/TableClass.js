import React from 'react';
import TableRowClass from './TableRowClass';

class TableClass extends React.Component {
    render() {
        let tableRowClass = this.props.classes.map(c => <TableRowClass key={"TableRowClass_"+c.id} course={c} termNumber={this.props.termNumber} changeCourseName={this.props.changeCourseName} changeCourseCode={this.props.changeCourseCode} changeCourseUnit={this.props.changeCourseUnit} changeCourseGrade={this.props.changeCourseGrade}/>);
        return(
            <React.Fragment>
                {tableRowClass}
            </React.Fragment>
        );
    }

}

export default TableClass;