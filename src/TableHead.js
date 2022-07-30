import React from "react";


class TableHead extends React.Component {

    render() {
        return (
            <tr>
                <th>Course code</th>
                <th>Course name</th>
                <th>Units</th>
                <th>Grade</th>
            </tr>
        );
    }
}

export default TableHead;