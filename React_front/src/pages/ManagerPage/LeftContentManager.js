import React, { Component } from 'react';
import TabContentManager from './TabContentManager';
import TabManager from './TabManager';

class LeftContentManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabdefault: 1
        }
        this.onActiveTab = this.onActiveTab.bind(this);
    }

    onActiveTab(params) {
        // console.log(params);
        this.setState({
            tabdefault : params
        });
    }

    render() {
        var tables = this.props.data.map((table,index)=>{
            return table;
        });
        var navTab = this.props.data.map((tab, index)=> {
            return ({
                name : tab.level,
                display : tab.display
            })
        })
    //    var {tablePicked} = this.props
        return (
            <div className="left_tap">
            <TabManager navTab = {navTab} tabdefault={this.state.tabdefault} onReceiveTabActive={this.onActiveTab} />
            <TabContentManager tabdefault = {this.state.tabdefault} data= {tables} handledishes={this.props.handledishes} printDocument = {this.props.printDocument}/>
            </div>
        );
    }
}

export default LeftContentManager;
