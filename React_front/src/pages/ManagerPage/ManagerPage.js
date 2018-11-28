import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import {Redirect} from 'react-router-dom'
import OrderListManager from '../../components/orderlist/orderlistmanager';
import LeftContentManager from './LeftContentManager';
class ManagerPage extends Component {
    componentWillMount() {
        if(localStorage.getItem('uid') === null) {
            return;
        }
        callApi( `waiter/table`, 'GET', null).then(res => {
           this.setState({
               data : res.data
           })
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            dishes : []
        }
    };

    handledishes(datas) {
    console.log(datas);
       this.setState({
           dishes : datas
       })
    }

    render() {
        localStorage.removeItem("picked")
        var dishes = this.state.dishes;
        if(localStorage.getItem('uid') === null) {
            return <Redirect to= '/login' />
        }
        // console.log(console.log(this.state.data));
        var {data,tablePicked} = this.state
        return (
            <div>
                <Header />
                <div id = "wrap">
                <LeftContentManager data= {data} tablePicked={tablePicked} handledishes={this.handledishes}/>
                <OrderListManager dishes ={dishes}/>
                </div>
            </div>

        );
    }
}

export default ManagerPage;
