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
    componentDidMount() {
        callApi('users.json', 'GET', null).then(res => {
            this.setState({
                check : res.data
            })
         })
    
    }
    checkAcc = () =>{
        if (this.state.txtPassword == '' || this.state.txtUsername == '') {
            return false;
        }
        else return true;
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
        var users = this.state.check;
        var temp = false;
        if (this.checkAcc()) {
            for(let i =0; i< users.length; i++) {
                if(users[i].username === txtUsername && users[i].password === txtPassword && users[i].username !== '' && users[i].password !== '' ) {
                    temp = true;
                }
            }
            if(temp === false) {
                alert("Tài khoản chưa chính xác !");
                console.log(this.checkAcc());
            } else {
                this.setState ({
                    isLogin : true
                })
            }
        }
        else{
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập !');
        }                
    }

    render() {
        var { txtUsername, txtPassword } = this.state;
        if(this.state.isLogin === true) {
            return <Redirect to= '/menu'/>
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
