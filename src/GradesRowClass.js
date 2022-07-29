import React from 'react';

class GradesRowClass extends React.Component {

    render() {
        return (
            <tr>
                <td colSpan="3">Term GPA</td>
                <td>{this.props.gpa.toFixed(3)}</td>
            </tr>
        );
    }

}

export default GradesRowClass;