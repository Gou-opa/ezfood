import React, { Component } from 'react';
import TabcontentEditMenu from '../tabcontent/tabcontentEditMenu';
import TabEditMenu from './tabEditMenu';



class LeftcontenEditMenu extends Component {
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
                <TabEditMenu navTab = {navTab} tabdefault={this.state.tabdefault} onReceiveTabActive={this.onActiveTab}/>
                <TabcontentEditMenu tabdefault = {this.state.tabdefault} data= {dishs}  dishpicked ={dishpicked} handleDeleteDish = {this.props.handleDeleteDish}/>
                
            </div>
        );
    }
}

export default LeftcontenEditMenu;