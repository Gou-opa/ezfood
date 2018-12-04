import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class TabManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabname: this.props.navTab
        }
    }
    componentDidMount() {
        localStorage.setItem('tabname', 1)
    }
    setActiveTab = (name) => {
        this.props.onReceiveTabActive(name);
        localStorage.setItem('tabname', name);
    }
    render() {
        // console.log(this.props.navTab)
        var tabname = this.props.navTab.map((tab, index) => {
            let to = `/manager`;
            return <Link to={to} key={index} exact="true"
                className={this.props.tabdefault === tab.name ? 'active' : ''}
                onClick={() => this.setActiveTab(tab.name)}
            >{tab.display}</Link>
        })
        return (
            <div className="tab">
                {tabname}
            </div>

        );
    }
}

export default TabManager;
