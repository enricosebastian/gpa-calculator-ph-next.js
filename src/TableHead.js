import React from "react";


class TableHead extends React.Component {

    render() {
        return (
            <thead>
                <tr>
                    <th>Course code</th>
                    <th>Course name</th>
                    <th>Units</th>
                    <th>Grade</th>
                </tr>
            </thead>
        );
    }
}

export default TableHead;