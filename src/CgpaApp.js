import React from "react";
import Checkboxes from './Checkboxes';

class CgpaApp extends React.Component {
    render() {
        let totalCourseUnit = 0;
        let totalCourseUnitCourseGrade = 0;
        this.props.terms.forEach((t)=>{
            if(t.isChecked === true) {
                t.classes.forEach(c => {
                    totalCourseUnit += parseFloat(c.courseUnit);
                    totalCourseUnitCourseGrade += parseFloat(c.courseUnit) * parseFloat(c.courseGrade);
                });
            }
        });

        console.log("totalCourseUnit", totalCourseUnitCourseGrade);
        console.log("totalCourseUnit", totalCourseUnit);
        let cgpa = isNaN(totalCourseUnitCourseGrade/totalCourseUnit) ? 0 : totalCourseUnitCourseGrade/totalCourseUnit;

        return (
            <div className="content">
                <Checkboxes terms={this.props.terms} changeIsChecked={this.props.changeIsChecked}/>
                CGPA: {cgpa.toFixed(3)}
            </div>
        );
    
    }
}

export default CgpaApp;