import React from "react";

class TableRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.classes.courseCode}</td>
                <td>{this.props.classes.courseName}</td>
                <td>{this.props.classes.courseUnit}</td>
                <td>{this.props.classes.courseGrade}</td>
            </tr>
        );
    
    }

}

export default TableRow;