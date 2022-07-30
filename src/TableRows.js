import React from "react";
import TableRow from './TableRow';


class TableRows extends React.Component {
    render() {
        let tableRows = this.props.classes.map(
            c => < TableRow 
                    selectedTerm={this.props.selectedTerm} 
                    class={c} 
                    changeCourseCode={this.props.changeCourseCode}
                    changeCourseUnit={this.props.changeCourseUnit}
                    changeCourseName={this.props.changeCourseName}
                    changeCourseGrade={this.props.changeCourseGrade} 
                    />
        );
        return (
            <React.Fragment>
                {tableRows}
                <tr>
                    <td colSpan="3">term gpa</td>
                    <td>3.0</td>
                </tr>
            </React.Fragment>
        );
    }
}

export default TableRows;