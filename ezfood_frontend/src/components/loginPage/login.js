import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



class Loggin extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            txtUsername: '',
            txtPassword: '',
            isLogin : false
        }
    }

    onChange=(e)=> {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] :value
        })
    }

    onLogin = (e) => {
        e.preventDefault();
        this.setState ({
            isLogin : true
        })
    }
    render() {

        var { txtUsername, txtPassword } = this.state;
        if(this.state.isLogin === true) {
            return <Redirect to= '/manager'/>
        }
        return (
            <div className="materialContainer">
                <form className="box" onSubmit = {this.onLogin}>
                    <div className="title">Đăng nhập</div>
                    <div className="input">
                        <label htmlFor="name">Tên đăng nhập</label>
                        <input type="text"
                            name="txtUsername"
                            id="name"
                            value={txtUsername}
                            onChange={this.onChange} />
                        <span className="spin" />
                    </div>
                    <div className="input">
                        <label htmlFor="pass">Mật khẩu</label>
                        <input type="password"
                            name="txtPassword"
                            id="pass"
                            value={txtPassword}
                            onChange={this.onChange} />
                        <span className="spin" />
                    </div>
                    <div className="button login">
                        <button type="submit">Đăng nhập</button>
                    </div>
                    <a href="true" className="pass-forgot">Quên mật khẩu?</a>
                </form>


                <div className="overbox">
                    <div className="material-button alt-2"><span className="shape" /></div>
                    <div className="title">Tạo tài khoản</div>
                    <div className="input">
                        <label htmlFor="regname">Tên tài khoản</label>
                        <input type="text" name="regname" id="regname" />
                        <span className="spin" />
                    </div>
                    <div className="input">
                        <label htmlFor="regpass">Mật khẩu</label>
                        <input type="password" name="regpass" id="regpass" />
                        <span className="spin" />
                    </div>
                    <div className="input">
                        <label htmlFor="reregpass">Nhập lại mật khẩu</label>
                        <input type="password" name="reregpass" id="reregpass" />
                        <span className="spin" />
                    </div>
                    <div className="button">
                        <button><span>Đăng ký</span></button>
                    </div>
                </div>
            </div>


        );
    }
}

export default Loggin;
