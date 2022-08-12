import React from 'react';

class Checkbox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <input type="checkbox" id={this.props.term.termNumber} checked={this.props.term.isChecked}/>
                <label htmlFor={this.props.term.termNumber}>Term {this.props.term.termNumber}</label><br/>
            </React.Fragment>
        );
    }
}

export default Checkbox;