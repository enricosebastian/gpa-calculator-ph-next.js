import React from "react";

class AddTermButton extends React.Component {

    render() {
        return (
            <button onClick={this.props.addTerm}>Add Term</button>
        );
    }

}

export default AddTermButton;