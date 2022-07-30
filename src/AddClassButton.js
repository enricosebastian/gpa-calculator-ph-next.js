import React from "react";

class AddClassButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                <br/>
                <button onClick={() => this.props.addClass(this.props.selectedTerm)}>Add course</button>
            </React.Fragment>
            
        );
    }
}

export default AddClassButton;