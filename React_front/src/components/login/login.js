import React, { Component } from 'react';
import { Redirect ,Link} from 'react-router-dom';
import callApi from '../../service/APIservice'
class Loggin extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            txtUsername: '',
            txtPassword: '',
            isLogin : false,
            check : []
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
        var {txtUsername, txtPassword} = this.state;
        if(txtPassword === '' || txtUsername === '')  {
            alert('Moi ban nhap tai khoan va mat khau !')
        } else {
            callApi('login', 'POST', {
                username : txtUsername,
                password : txtPassword
            }).then(res => {
                console.log(res.data)
                localStorage.setItem("infor" , JSON.stringify(res.data))
                if(res.status === 200 ) {
                    this.setState({
                        isLogin :true
                    })
                } else if(res.status === 299){
                    alert('Tài khoản hoặc mật khẩu không chính xác !')
                }
             })
        }
    }

    render() {
        var { txtUsername, txtPassword } = this.state;
        if(this.state.isLogin === true && JSON.parse(localStorage.getItem("infor")).role === 1 && JSON.parse(localStorage.getItem("infor")).order === '') {
            return <Redirect to= '/picktable'/>
        } else if (this.state.isLogin === true && JSON.parse(localStorage.getItem("infor")).role === 2) {
            return <Redirect to= '/manager'/>
        } else if (this.state.isLogin === true && JSON.parse(localStorage.getItem("infor")).role === 1 && JSON.parse(localStorage.getItem("infor")).order !== '') {
            return <Redirect to= '/menu'/>
        }
        return (
            <div className="login_page_ta">
                <div id="login_style">
                    <form className="box" onSubmit = {this.onLogin}>
                        <div className="title">Đăng nhập</div>
                        <div className="input">
                            <input type="text"
                                placeholder="Tên tài khoản"
                                name="txtUsername"
                                id="name"
                                value={txtUsername}
                                onChange={this.onChange} />
                            <span className="spin" />
                        </div>
                        <div className="input">
                            <input type="password"
                            placeholder="Mật khẩu"
                                name="txtPassword"
                                id="pass"
                                value={txtPassword}
                                onChange={this.onChange} />
                            <span className="spin" />
                        </div>
                        <div className="button login">
                            <button type="submit">Đăng nhập</button>
                        </div>
                        <Link to ="/register" className="pass-forgot">Đăng ký</Link>
                    </form>
                </div>
            </div>

        );
    }
}

export default Loggin;
