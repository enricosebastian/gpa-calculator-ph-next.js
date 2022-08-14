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
        let cgpa = isNaN(totalCourseUnitCourseGrade/totalCourseUnit) ? 0 : totalCourseUnitCourseGrade/totalCourseUnit;

        return (
            <div className="content">
                <Checkboxes terms={this.props.terms} changeIsChecked={this.props.changeIsChecked}/>
                CGPA: {cgpa.toFixed(3)}<br/>
                {cgpa >= 3.4 ? "Rank: " : ""} 
                {cgpa >= 3.8 ? "Summa cum laude " : ""} 
                {(cgpa < 3.8 && cgpa >= 3.6) ? "Magna cum laude " : ""}
                {(cgpa < 3.6 && cgpa >= 3.4) ? "Cum laude " : ""}
                {(cgpa < 3.4 && cgpa >= 3.2) ? "Honorable mention " : ""}
                {cgpa >= 3.4 ? "(Sana ol)" : ""} 
            </div>
        );
    
    }
}

export default CgpaApp;