import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    state = {
        avatarActive : 'dropdown-avatar',
        lefMenuactive :''
    }


    onActive = () => {
        this.setState({
            avatarActive : (this.state.avatarActive === 'dropdown-avatar') ? "dropdown-avatar active" : "dropdown-avatar"
        })
    }
    onActiveLeftMenu = () => {
        this.setState({
            lefMenuactive : (this.state.lefMenuactive === '') ? " active" : ""
        })
    }
    render() {
        var {avatarActive, lefMenuactive} = this.state;
        return (
            <div >
                <nav id="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_item" id="nav_side">
                            <i className="fa fa-bars" aria-hidden="true" onClick = {this.onActiveLeftMenu} />
                        </li>
                        <li className="nav_item" id="nav_logo">
                            EZ FOOD
  </li>
                        <li className="nav_item" id="nav_avatar">
                            <img src="../images/guest_biopic-holland_1.jpg" alt="a" />
                            <i className="fa fa-sort-desc "  aria-hidden="true" id="icon" onClick = {this.onActive}/>
                            <ul className={avatarActive}>
                                <p className="dropdown-title">Your Profile</p>
                                <li className="dropdown-content">Setting</li>
                                <li className="dropdown-content">Log out</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* left menu */}
                <div id="left_menu" className ={lefMenuactive}>
                    <ul className="menu_list">
                        <li><NavLink to="/menu" >Menu</NavLink></li>
                        <li><NavLink to="/manager">Manager</NavLink></li>
                        <li><NavLink to="/dashboard">Bisiness</NavLink></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
