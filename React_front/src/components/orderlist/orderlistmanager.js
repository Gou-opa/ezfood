import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import OrderItemManager from './orderItemManager';

class OrderListManager extends Component {
    sendPayment = (id) => {
        console.log(id)
        callApi( `manager/paid `, 'POST', {
            tid : id,
            uid : localStorage.getItem('uid')
        }).then(res => {
            if(res.status === 409) {
                alert("Sap server roi huhu")
            } else if (res.status === 200 ){
                alert("thanh toan thanh cong")
            }
         })
    }


    showOrderList =(orderList) =>{
        var result = null;
        if(orderList.length >0 ){
            result =  orderList.map((orderItem, index)=> {
                return (
                    <OrderItemManager
                    key ={index}
                    data ={orderItem}
                    dishes = {this.props.dishes}
                    />
                )
            })
        }
        return result;
    }
    render() {
        console.log(this.props.dishes)
        return (
            <div className="tab_right">
                <div className="thanh-t">
                    <label id="total-money"><b>Tổng Tiền : 0 đ</b> </label>
                    <button id="payment" onClick={this.sendPayment.bind(this,localStorage.getItem("tid"))}><i className="fa fa-credit-card-alt" aria-hidden="true">Payment</i></button>
                </div>
                <br />
                <h2>Bàn </h2>
                <ul className="one_dish" id="title-orderlist">
                    <li className="name_dish pay-item">Tên món ăn</li>
                    <li className="price_dish pay-item">Giá/món</li>
                    <li className="number_dish pay-item">Số lượng</li>
                    <li className="total_one pay-item"></li>
                    <li className="delete_dish pay-item">Xóa/món</li>
                </ul>


            </div>
        )
    }
}

export default OrderListManager;
