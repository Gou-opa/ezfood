import React, { Component } from 'react';
import { Redirect ,Link} from 'react-router-dom';
import callApi from '../../service/APIservice'
// import callApiAo from '../../service/APIao'
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
    // componentDidMount() {
    //     callApiAo('users', 'GET', null).then(res => {
    //         this.setState({
    //             check : res.data
    //         })
    //      })
    // }

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
                if(res.status === 200 ) {
                    localStorage.setItem('uid', res.data.uid);
                    this.setState({
                        isLogin :true
                    })
                } else if(res.status === 299){
                    alert('Tài khoản hoặc mật khẩu không chính xác !')
                }
             })

        //    this.setState({
        //        isLogin : true
        //    })


        }
       
      
    }

    render() {
        console.log(this.state.check)
        var { txtUsername, txtPassword } = this.state;
        if(this.state.isLogin === true) {
            return <Redirect to= '/manager'/>
        } 
        return (
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


        );
    }
}

export default Loggin;
