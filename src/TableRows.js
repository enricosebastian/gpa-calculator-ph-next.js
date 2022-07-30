import React from "react";
import TableRow from './TableRow';


class TableRows extends React.Component {
    render() {
        let tableRows = this.props.classes.map(c => <TableRow classes={c}/>);
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