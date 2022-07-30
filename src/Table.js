import React from 'react';
import TableHead from './TableHead';
import TableRows from './TableRows';

class Table extends React.Component {

    render() {
        return (
            <table>
                <TableHead/>
                <TableRows 
                    selectedTerm={this.props.selectedTerm} 
                    classes={this.props.classes}
                    changeCourseCode={this.props.changeCourseCode}
                    changeCourseUnit={this.props.changeCourseUnit}
                    changeCourseName={this.props.changeCourseName}
                    changeCourseGrade={this.props.changeCourseGrade}
                />
            </table>
        );
    
    }

}

export default Table;