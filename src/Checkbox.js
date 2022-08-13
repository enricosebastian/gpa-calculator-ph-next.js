import React from 'react';

class Checkbox extends React.Component {

    changeIsChecked = (termNumber) => {
        this.props.changeIsChecked(termNumber);
    };

    render() {
        return (
            <React.Fragment>
                <input type="checkbox" id={this.props.term.termNumber} checked={this.props.term.isChecked} onChange={() => this.changeIsChecked(this.props.term.termNumber)}/>
                <label htmlFor={this.props.term.termNumber}>Term {this.props.term.termNumber}</label><br/>
            </React.Fragment>
        );
    }
}

export default Checkbox;