import React from 'react';

class TermButtonClass extends React.Component {

    changeSelectedTerm = () => {
        this.props.handleOnClick(this.props.termNumber);
    };

    render() {
        return <button onClick={this.changeSelectedTerm}>Term {this.props.termNumber}</button>
    }
}

export default TermButtonClass;