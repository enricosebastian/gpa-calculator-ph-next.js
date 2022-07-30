import React from 'react';

import Table from './Table';
import AddClassButton from './AddClassButton';



class TableApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Table 
                    selectedTerm={this.props.selectedTerm} 
                    classes={this.props.classes}
                    changeCourseCode={this.props.changeCourseCode}
                    changeCourseUnit={this.props.changeCourseUnit}
                    changeCourseName={this.props.changeCourseName}
                    changeCourseGrade={this.props.changeCourseGrade}
                />
                <AddClassButton 
                    selectedTerm={this.props.selectedTerm} 
                    addClass={this.props.addClass}
                />
            </React.Fragment>
        );
    }
}

export default TableApp;