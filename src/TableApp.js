import React from 'react';

import Table from './Table';
import AddClassButton from './AddClassButton';



class TableApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Table classes={this.props.classes}/>
                <AddClassButton selectedTerm={this.props.selectedTerm} addClass={this.props.addClass}/>
            </React.Fragment>
        );
    }
}

export default TableApp;