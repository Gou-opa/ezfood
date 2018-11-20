import React, { Component } from 'react';
import OrderItem from './orderItem';
import callApi from '../../service/APIservice';

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalMoney : 0
        }
    }
    
    showOrderList =(orderList) =>{
        var result = null;
        if(orderList.length >0 ){
            result =  orderList.map((orderItem, index)=> {
                return (
                    <OrderItem
                    key ={index}
                    data ={orderItem}
                    handleDeleteDish = {this.props.handleDeleteDish}
                    printquantity = {this.props.printquantity}
                    />
                )
            })
        }
        return result;
    }

    sendOrder =() => {
        var orderList = this.props.dishpicked;
        if(orderList.length > 0) {
            alert("Đã gửi đơn hàng , Hân hạnh phục vụ quý khách !")
        } else {
            alert("Mời quý khách chọn món !")
        }
        this.props.handleOrderList();
    }

    countTotalMoney=(dishpicked) => {
        var result = 0;
        dishpicked.map((dish, index) => {
            result = result + dish.price;
        });
        return result;
    }


    sendPayment =()=> {
        var totalMoney = this.countTotalMoney(this.props.dishpicked);
    
        callApi( 'waiter/pay', 'POST', {
            orderid : localStorage.getItem('orderid'),
            estimate : totalMoney
        }).then(res => {
            console.log(res.data)
            if(res.status === 200) {
               alert('thanh cong');
            } else {
                alert("Lỗi giao dịch !")
            }
          
        })

        this.setState({
            totalMoney : totalMoney
        })
       
    }
    render() {
    
        var orderList = this.props.dishpicked;
        // console.log(orderList);
        return (
            <div className="tab_right">
                <div className="thanh-t">
                    <label  id="total-money">Tổng : {this.state.totalMoney}</label>

                    <button id="payment" onClick = {this.sendOrder}><i className="fa fa-credit-card-alt" aria-hidden="true">Order</i></button>
                    <button id="payment" onClick = {this.sendPayment}><i className="fa fa-credit-card-alt" aria-hidden="true">payment</i></button>
                </div>
                <h2>Ban1 - Tang1</h2>
                {this.showOrderList(orderList)}
            </div>


        );
    }
}

export default OrderList;
