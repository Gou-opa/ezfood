import React, { Component } from 'react';
import Tab from './tab';    
import TabContent from '../tabcontent/tabcontent';

class LeftContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabdefault: 'Khaivi'
        }
        this.onActiveTab = this.onActiveTab.bind(this);
    }

    onActiveTab(params) {
        this.setState({
            tabdefault : params
        });
    }

    render() {
        var dishs = this.props.data.map((dish,index)=>{
            return dish;
        });
        var navTab = this.props.data.map((tab, index)=> {
            return ({
                name : tab.name,
                display : tab.display
            })
        })
       
        return (
            <div className="left_tap">
                <Tab navTab = {navTab} tabdefault={this.state.tabdefault} onReceiveTabActive={this.onActiveTab}/>
                <TabContent tabdefault = {this.state.tabdefault} data= {dishs} />
            </div>
        );
    }
}

export default LeftContent;
