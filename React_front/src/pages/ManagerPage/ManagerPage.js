import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import { Redirect } from 'react-router-dom'
import OrderListManager from '../../components/orderlist/orderlistmanager';
import LeftContentManager from './LeftContentManager';
import { realtime, uid } from '../../service/auth'

class ManagerPage extends Component {
    componentWillMount() {
        if (localStorage.getItem('uid') === null) {
            return;
        }
        callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
            console.log(res.data)
            this.setState({
                data: res.data
            })
        })

        if (localStorage.getItem('realtime_that') !== realtime) {
            callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dishes: []
        }
        this.handledishes = this.handledishes.bind(this);
    };

    handledishes = (id) => {
        console.log(id);
        localStorage.setItem('tid', id);
        callApi(`manager/order/preview/${id}/${uid}`, 'GET', null).then(res => {
            console.log(res.data.dishes)
            if (res.data === null) {
                alert("Khách ở bàn này chưa gọi món !")
            } else {
                this.setState({
                    dishes: res.data.dishes
                })
            }

        })
    }

    handleCompletePayment = (id) => {
        console.log(id);
        callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
    }

    duplicate = (arr) => {
        return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    }

    filterDishes = (arr) => {
        var temp = this.duplicate(arr);
        console.log(temp);
        return arr;
    }


    render() {
        console.log(this.state.dishes)
        // console.log(this.state.data)
        localStorage.removeItem("picked")
        var dishes = this.filterDishes(this.state.dishes);
        if (localStorage.getItem('uid') === null) {
            return <Redirect to='/login' />
        }
        // console.log(console.log(this.state.data));
        var { data, tablePicked } = this.state
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftContentManager data={data} tablePicked={tablePicked} handledishes={this.handledishes} />
                    <OrderListManager dishes={dishes} completePayment={this.handleCompletePayment.bind(this)} />
                </div>
            </div>

        );
    }
}

export default ManagerPage;
