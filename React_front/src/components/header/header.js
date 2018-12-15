import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import callApi from '../../service/APIservice';
import {uid} from '../../service/auth'

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                // localStorage.removeItem("picked")
                let x = '';
                if (label === 'Dashboard') {
                    x = <i className="far fa-chart-bar" style={{ fontSize: '24px' }}></i>;
                }
                return (
                    <li><Link to={to}>{x} {label}</Link></li>
                )
            }} />
    )
}

class Header extends Component {
    componentWillMount() {
        if (JSON.parse(localStorage.getItem("infor")).role === 2) {
            this.setState({
                menus: [
                    {
                        name: 'Manager',
                        to: '/manager',
                        exact: true
                    },
                    {
                        name: 'Dashboard',
                        to: '/dashboard',
                        exact: true
                    },
                    {
                        name: 'EditMenu',
                        to: '/editmenu',
                        exact: true
                    },
                    {
                        name: 'AddTable',
                        to: '/addtable',
                        exact: true
                    }
                ]
            })
        }
    }

       
    constructor(props) {
        super(props);
        this.state = {
            avatarActive: 'dropdown-avatar',
            lefMenuactive: '',
            stateClass: "AddAvatar hideAvatarEdit",
            filename: "",
            file: "",
            url: '',
            avatar :  JSON.parse(localStorage.getItem("infor")).avatar,

            menus : [{
                name: 'Menu',
                to: '/menu',
                exact: true
            },
            {
                name: 'Picktable',
                to: '/picktable',
                exact: true
            }]
        }
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
    showMenu = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (<MenuLink
                    key={index}
                    label={menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                />)
            })
        }
        return result;
    }
    _handleSubmit(e) {
        e.preventDefault();
        var avatar = this.state.filename;
        // console.log(this.state);
        // console.log(avatar);
          callApi(`change-user-avatar`, 'POST', {  
            avatar: avatar,  
            uid: uid        
          }).then(res => {
            //   console.log(res);
            //   console.log(uid);
            //   console.log(avatar);
          })
          const formData = new FormData()
          formData.append('avatar', this.state.file, this.state.file.name)
          callApi(`change-avatar`, 'POST', formData).then(res => {
            if(res.status === 200){
                let x = JSON.parse(localStorage.getItem("infor"));
                x.avatar = res.data.url;
                console.log(x);
              console.log(localStorage.setItem("infor", JSON.stringify(x)));
              this.setState({
                  avatar : res.data.url
              })
              this.setState({stateClass: "AddAvatar hideAvatarEdit"})
            }
              
          })        
          alert('Đã thay đổi ảnh đại diện');
          this.setState({stateClass: "AddAvatar hideAvatarEdit"})   
        
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            filename: file.name,
            file: file,
            url: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

      logOut =() => {
          if(JSON.parse(localStorage.getItem("infor")).order === '') {
            localStorage.clear();
          }
      }

    render() {
        let {url} = this.state;
        let $imagePreview = null;
        
        if (url) {
          $imagePreview = (<img src={url} alt="preview"/>);
        } else {
          $imagePreview = (<div className="previewText">Vui lòng chọn hình ảnh đại diện</div>);
        }
        var { avatarActive, lefMenuactive,stateClass } = this.state;
        // console.log(JSON.parse(localStorage.getItem("infor")).avatar)
        var avatar = this.state.avatar;
        return (
            <div >
                <nav id="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_item" id="nav_side">
                            <i className="fa fa-bars" aria-hidden="true" onClick={this.onActiveLeftMenu} />
                        </li>
                        <li className="nav_item" id="nav_logo">
                            <img src="../images/logo4.png" alt="a" />
                        </li>
                        <li className="nav_item" id="nav_avatar">
                            <img src={avatar} alt="a" />
                            <i className="fa fa-sort-desc " aria-hidden="true" id="icon" onClick={this.onActive} />
                            <ul className={avatarActive}>
                                <p className="dropdown-title"><b>{JSON.parse(localStorage.getItem("infor")).name}</b></p>
                                <li className="dropdown-content" onClick ={() => {this.setState({stateClass: "AddAvatar"})}}>Cài đặt</li>
                                <li className="dropdown-content"><Link to="/" onClick={this.logOut }>Đăng xuất</Link></li>
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
                {/* set avatar */}
                <div className={stateClass}>
                    <button className="closeBT" onClick ={() => {this.setState({stateClass: "AddAvatar hideAvatarEdit"})}}>X</button>
                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                    <form onSubmit={(e)=>this._handleSubmit(e)}>
                        <input className="fileInput" 
                            type="file" 
                            name="avatar"
                            id="avatar"
                            onChange={(e)=>this._handleImageChange(e)} 
                            />
                        <div><label htmlFor="avatar" className="label-avatar">Chọn ảnh</label></div>    
                        <button className="submitButton" 
                            type="submit" 
                            onClick={(e)=>this._handleSubmit(e)}>Thêm ảnh đại diện</button>
                        </form>
                    
            </div>
            {/* set avatar */}
                <div className={stateClass}>
                    <button className="closeBT" onClick ={() => {this.setState({stateClass: "AddAvatar hideAvatarEdit"})}}>X</button>
                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                    <form onSubmit={(e)=>this._handleSubmit(e)}>
                        <input className="fileInput" 
                            type="file" 
                            name="avatar"
                            id="avatar"
                            onChange={(e)=>this._handleImageChange(e)} 
                            />
                        <div><label htmlFor="avatar" className="label-avatar">Choose a file</label></div>    
                        <button className="submitButton" 
                            type="submit" 
                            onClick={(e)=>this._handleSubmit(e)}>Thêm ảnh đại diện</button>
                        </form>
                    
            </div>
                {/* end nav */}
            </div>

        );
    }
}

export default Header;
