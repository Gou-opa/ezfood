import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import {Redirect} from 'react-router-dom'
import LeftContentPickTable from '../../components/leftcontent/leftcontenPickTable';
import QuangCao from './quancao';
import {uid} from '../../service/auth'
class PickTablePage extends Component {
    componentWillMount() {
        if(localStorage.getItem('infor') === null) {
            return;
        }
        callApi( `waiter/table/${uid}`, 'GET', null).then(res => {
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
        if(localStorage.getItem('infor') === null) {
            return <Redirect to= '/login' />
        } else if(JSON.parse(localStorage.getItem("infor")).role !== 1) {
            return <Redirect to='/khongdu' />
        }else if(localStorage.getItem("numOftable") !== null) {
            return <Redirect to ='/menu' />
        }
        // console.log(console.log(this.state.data));
        console.log(JSON.parse(localStorage.getItem("infor")).role);

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
