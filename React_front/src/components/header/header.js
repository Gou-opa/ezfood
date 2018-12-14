import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

const MenuLink = ({label, to, activeOnlyWhenExact})=> {
    return (
        <Route 
        path = {to}
        exact={activeOnlyWhenExact}
        children={({match})=> {
            // localStorage.removeItem("picked")
            let x = '';
            if(label==='Dashboard'){
                x = <i className="far fa-chart-bar" style={{fontSize:'24px'}}></i>;
            }
            return (
                <li><Link to ={to}>{x} {label}</Link></li>
            )
        }}/>
    )
}

class Header extends Component {
    componentWillMount() {
        if(JSON.parse(localStorage.getItem("infor")).role === 2) {
            this.setState({
                menus : [
                    {
                                name : 'Manager',
                                to : '/manager',
                                exact :true
                            },
                            {
                                name : 'Dashboard',
                                to : '/dashboard',
                                exact :true
                            },
                            {
                                name : 'EditMenu',
                                to : '/editmenu',
                                exact :true
                            },
                            {
                                name : 'AddTable',
                                to : '/addtable',
                                exact :true
                            }
                ]
            })
        }
    }

   
    state = {
        avatarActive: 'dropdown-avatar',
        lefMenuactive: '',
        menus : [{
            name : 'Menu',
            to : '/menu',
            exact :true
        },
        {
            name : 'Pick Table',
            to : '/picktable',
            exact :true
        }]
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
        console.log(JSON.parse(localStorage.getItem("infor")).avatar)
        var avatar = ".." + JSON.parse(localStorage.getItem("infor")).avatar;
        return (
            <div >
                <nav id="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_item" id="nav_side">
                            <i className="fa fa-bars" aria-hidden="true" onClick={this.onActiveLeftMenu} />
                        </li>
                        <li className="nav_item" id="nav_logo">
                            <img src ="../images/logo4.png" alt ="a" />
                        </li>
                        <li className="nav_item" id="nav_avatar">
                            <img src= {avatar} alt="a" />
                            <i className="fa fa-sort-desc " aria-hidden="true" id="icon" onClick={this.onActive} />
                            <ul className={avatarActive}>
                                <p className="dropdown-title"><b>{JSON.parse(localStorage.getItem("infor")).name}</b></p>
                                <li className="dropdown-content" onClick ={() => {alert("se hoan thien som thoi")}}>Cài đặt</li>
                                <li className="dropdown-content"><Link to ="/" onClick ={() =>{localStorage.clear()}}>Đăng xuất</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* left menu */}
                <div id="left_menu" className={lefMenuactive}>
                    <ul className="menu_list">
                       {this.showMenu(this.state.menus)}
                    </ul>
                </div>
                {/* end nav */}
            </div>

        );
    }
}

export default Header;
