import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import {Redirect} from 'react-router-dom'
import LeftContentPickTable from '../../components/leftcontent/leftcontenPickTable';
import QuangCao from './quancao';
import {uid} from '../../service/auth'
class PickTablePage extends Component {
    componentWillMount() {
        if(localStorage.getItem('uid') === null) {
            return;
        }
        callApi( `waiter/table/${uid}`, 'GET', null).then(res => {
            localStorage.setItem('realtime', false)
           this.setState({
               data : res.data
           })
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            tablePicked : []
        }
    };

    render() {
        // console.log(this.state.data)
        if(localStorage.getItem('infor') === null) {
            return <Redirect to= '/login' />
        } else if(JSON.parse(localStorage.getItem("infor")).role === 2) {
            return <Redirect to='/khongdu' />
        }
        // console.log(console.log(this.state.data));
        var {data,tablePicked} = this.state
        return (
            <div>
                <Header />
                <div id = "wrap">
                <LeftContentPickTable data= {data} tablePicked={tablePicked}/>
                <QuangCao />
                </div>
            </div>

        );
    }
}

export default PickTablePage;
