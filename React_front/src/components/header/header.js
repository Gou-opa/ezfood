import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

const menus = [
    {
        name : 'Menu',
        to : '/menu',
        exact :true
    },
    {
        name : 'Pick Table',
        to : '/picktable',
        exact :true
    },
    {
        name : 'Manager',
        to : '/manager',
        exact :true
    },
    {
        name : 'Dashboard',
        to : '/dashboard',
        exact :true
    }
];

const MenuLink = ({label, to, activeOnlyWhenExact})=> {
    return (
        <Route 
        path = {to}
        exact={activeOnlyWhenExact}
        children={({match})=> {
            // localStorage.removeItem("picked")
            return (
                <li><Link to ={to}>{label}</Link></li>
            )
        }}/>
    )
}

class Header extends Component {
    
    state = {
        avatarActive: 'dropdown-avatar',
        lefMenuactive: ''
    }
    onActive = () => {
        this.setState({
            avatarActive: (this.state.avatarActive === 'dropdown-avatar') ? "dropdown-avatar active" : "dropdown-avatar"
        })
    }
    onActiveLeftMenu = () => {
        this.setState({
            lefMenuactive: (this.state.lefMenuactive === '') ? " active" : ""
        })
    }
    showMenu =(menus)=>{
        var result = null;
        if(menus.length > 0) {
            result = menus.map((menu, index)=> {
                return (<MenuLink 
                key ={index}
                label={menu.name}
                to={menu.to}
                activeOnlyWhenExact={menu.exact}
                    />)
            })
        }
        return result;
    }
    render() {
        var { avatarActive, lefMenuactive } = this.state;
        return (
            <div >
                <nav id="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_item" id="nav_side">
                            <i className="fa fa-bars" aria-hidden="true" onClick={this.onActiveLeftMenu} />
                        </li>
                        <li className="nav_item" id="nav_logo">
                            EZ FOOD
                        </li>
                        <li className="nav_item" id="nav_avatar">
                            <img src="../images/guest_biopic-holland_1.jpg" alt="a" />
                            <i className="fa fa-sort-desc " aria-hidden="true" id="icon" onClick={this.onActive} />
                            <ul className={avatarActive}>
                                <p className="dropdown-title">Your Profile</p>
                                <li className="dropdown-content">Setting</li>
                                <li className="dropdown-content"><Link to ="/" onClick ={() =>{localStorage.clear()}}>Log out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* left menu */}
                <div id="left_menu" className={lefMenuactive}>
                    <ul className="menu_list">
                       {this.showMenu(menus)}
                    </ul>
                </div>
                {/* end nav */}
            </div>

        );
    }
}

export default Header;
