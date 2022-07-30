import React from 'react';
import TableHead from './TableHead';
import TableRows from './TableRows';

class Table extends React.Component {

    render() {
        return (
            <table>
                <TableHead/>
                <TableRows classes={this.props.classes}/>
            </table>
        );
    
    }

}

export default Table;