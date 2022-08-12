import React from 'react';
import TableApp from './TableApp';
import CgpaApp from './CgpaApp';


class Content extends React.Component {
    render() {
        return (
            <div className="contents">
                < TableApp 
                    classes={this.props.classes} 
                    selectedTerm={this.props.selectedTerm} 
                    addClass={this.props.addClass}
                    changeCourseCode={this.props.changeCourseCode}
                    changeCourseUnit={this.props.changeCourseUnit}
                    changeCourseName={this.props.changeCourseName}
                    changeCourseGrade={this.props.changeCourseGrade}
                />
                < CgpaApp terms={this.props.terms} />
            </div>
        );
    }
}

export default Content;