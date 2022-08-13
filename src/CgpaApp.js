import React from "react";
import Checkboxes from './Checkboxes';

class CgpaApp extends React.Component {
    render() {
        return (
            <div className="content">
                <Checkboxes terms={this.props.terms} changeIsChecked={this.props.changeIsChecked}/>
                CGPA: 
            </div>
        );
    
    }
}

export default CgpaApp;