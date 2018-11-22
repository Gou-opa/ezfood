import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import { Redirect ,Link} from 'react-router-dom';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: '',
            username: '',
            password: '',
            isSignup :false,
            cout : 5
        }
    }

    checkInfo = () => {
        if(this.state.username == '' || this.state.password == '' || this.state.display == ''){
            return false;
        }
        else return true;
    }

    onHandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit(event) {
        event.preventDefault();
        var {display, username, password} = this.state;
        console.log(this.state);
        var x = this.state.cout;
        if (this.checkInfo() == true) {
            callApi(`users/${x+1}.json`, 'POST', {
                display : display,
                username : username,
                password : password
            }).then(res => {
                this.setState ({
                    isSignup : true,
                    cout : x +1
                })
            })
        }
        else{            
                alert('Vui Lòng nhập đầy đủ thông tin tài khoản !');
        }
    }
    render() {
      var {display, username, password} = this.state;
      if(this.state.isSignup === true) {
        return <Redirect to= '/login'/>
    }
        return (
            <div id="register_style">
                <form className="box" onSubmit={this.onHandleSubmit.bind(this)}>
                    <div className="title">Tạo tài khoản</div>
                    <div className="input">
                        <input type="text"
                            placeholder="Họ và Tên"
                            name="display"
                            id="regname"
                            value ={display}
                            onChange={this.onHandleChange.bind(this)}
                        />
                        <span className="spin" />
                    </div>
                    <div className="input">
                        <input type="text"
                            placeholder="Tên tài khoản"
                            name="username"
                            id="reregpass"
                            value={username}
                            onChange={this.onHandleChange.bind(this)}
                        />
                        <span className="spin" />
                    </div>
                    <div className="input">
                        <input type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            id="regpass"
                            value={password}
                            onChange={this.onHandleChange.bind(this)}
                        />
                  
                    </div>
                    <div className="button login">
                        <button type="submit">Đăng ký</button>
                    </div>
                    <Link to ="/login" className="pass-forgot">Đăng nhập</Link>
                </form>
            </div>


        );
    }
}

export default Register;
