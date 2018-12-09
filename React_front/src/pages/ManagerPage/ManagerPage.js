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
        this.handledishes = this.handledishes.bind(this);
    };

    handledishes =(id)=> {
        localStorage.setItem('tid', id);
        callApi( `manager/order/preview/${id}`, 'GET', null).then(res => {
            // console.log(res.data)
            if(res.data === null) {
                alert("Khách ở bàn này chưa gọi món !")
            } else {
                this.setState({
                    dishes : res.data.dishes
                })
            }
          
          })
    // console.log(datas);
    //    this.setState({
    //        dishes : datas
    //    })
    }

    handleCompletePayment = (id) => {
        console.log(id);
        console.log(this.state.data);
    }


    render() {
        // console.log(this.state.dishes)
        // console.log(this.state.data)
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
                <OrderListManager dishes ={dishes} completePayment={this.handleCompletePayment.bind(this)}/>
                </div>
            </div>

        );
    }
}

export default ManagerPage;
