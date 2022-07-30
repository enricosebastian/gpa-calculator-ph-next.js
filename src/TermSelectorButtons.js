import React from "react";
import TermSelectorButton from "./TermSelectorButton";

class TermSelectorButtons extends React.Component {

    render() {
        let termSelectorButtons = this.props.terms.map(t=> <TermSelectorButton termNumber={t.termNumber} selectedTerm={this.props.selectedTerm} changeSelectedTerm={this.props.changeSelectedTerm}/>);
        return (
            <React.Fragment>
                {termSelectorButtons}
                &nbsp;
                &nbsp;
            </React.Fragment>
        );
    }
}

export default TermSelectorButtons;