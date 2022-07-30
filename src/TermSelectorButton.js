import React from 'react';

class TermSelectorButton extends React.Component {

    changeSelectedTerm = () => {
        this.props.changeSelectedTerm(this.props.termNumber);
    }

    render() {
        return (
            <button disabled={this.props.termNumber === this.props.selectedTerm} onClick={this.changeSelectedTerm}>Term {this.props.termNumber}</button>
        );
    }
}

export default TermSelectorButton;