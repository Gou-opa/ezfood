import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class TabEditMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabname : this.props.navTab
        }
    }
    setActiveTab =(name) => {
        this.props.onReceiveTabActive(name);
    }
    
    render() {
        // console.log(this.props.navTab);
        var tabname = this.props.navTab.map((tab, index)=>{
            let to = `/editmenu`;
            return  <Link to = {to} key = {index} exact = "true"
            className= {this.props.tabdefault === tab.name ? 'active' : ''}
             onClick= {()=> this.setActiveTab(tab.name)}
             >{tab.display}</Link>
        })
        return (
            <div className="tab">
                    {tabname}
            </div>

        );
    }
}

export default TabEditMenu;