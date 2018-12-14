import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import { Redirect } from 'react-router-dom'
import OrderListManager from '../../components/orderlist/orderlistmanager';
import LeftContentManager from './LeftContentManager';
import { uid } from '../../service/auth'
class ManagerPage extends Component {

    componentDidMount() {
        if (localStorage.getItem('infor') === null) {
            return;
        }
        this.interval = setInterval(() => {
            callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
                // console.log(res.data)
                this.setState({
                    data: res.data
                })
            })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        localStorage.setItem('tid', id);
        callApi(`manager/order/preview/${id}/${uid}`, 'GET', null).then(res => {
            // console.log(res.data.dishes)
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
        // console.log(temp);
        return arr;
    }


    render() {
        // console.log(this.state.data)
        // console.log(JSON.parse(localStorage.getItem("infor")).role)
        localStorage.removeItem("picked")
        var dishes = this.filterDishes(this.state.dishes);
        if (localStorage.getItem('infor') === null) {
            return <Redirect to='/login' />
        } else if (JSON.parse(localStorage.getItem("infor")).role !== 2) {
            return <Redirect to='/khongdu' />
        }
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
        
        // console.log(console.log(this.state.data));
       
    }
}

export default ManagerPage;
