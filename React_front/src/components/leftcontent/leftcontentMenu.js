import React, { Component } from 'react';
import TabMenu from './tabMenu';
import TabContentMenu from '../tabcontent/tabcontentMenu';

class LeftContentMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabdefault: 1
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
                name : tab.type,
                display : tab.display
            })
        })
       var {dishpicked} = this.props
        return (
            <div className="left_tap">
                <TabMenu navTab = {navTab} tabdefault={this.state.tabdefault} onReceiveTabActive={this.onActiveTab}/>
                <TabContentMenu tabdefault = {this.state.tabdefault} data= {dishs}  dishpicked ={dishpicked} handleDishPicked = {this.props.handleDishPicked}/>
            </div>
        );
    }
}

export default LeftContentMenu;
