import React from 'react';

class TermButtonClass extends React.Component {

    changeSelectedTerm = () => {
        this.props.handleOnClick(this.props.termNumber);
    };

    render() {
        return <button disabled={this.props.termNumber === this.props.selectedTerm} onClick={this.changeSelectedTerm}>Term {this.props.termNumber}</button>
    }
}

export default TermButtonClass;