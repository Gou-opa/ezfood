import React, { Component } from 'react';
import TablePayment from './tablepayment';


class TabContentManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    showTables = (tables) => {
        // console.log(tables);
        var result = null;
        var {dishpicked} = this.props;
        if (tables.length > 0) {
            result = tables.map((table, index)=> {
                return (
                   <TablePayment 
                   key={index}
                   table={table}
                   dishpicked={dishpicked}
                   handledishes={this.props.handledishes}
                   printDocument = {this.props.printDocument}
                   />
                )
            })
        }
        return result;
    }

    render() {
        var id = this.props.tabdefault;
        var tables=[];
        this.props.data.map((item, index) => {
            if (item.level === id) {
                tables = item.tables;
            }
            return true;
            
        });
        return (
            <div id={id} className="tabcontent">
                {this.showTables(tables)}
            </div>
        );


    }
}

export default TabContentManager;
