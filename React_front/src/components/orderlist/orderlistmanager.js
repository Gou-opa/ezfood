import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import OrderItemManager from './orderItemManager';
import {Redirect} from "react-router-dom"
class OrderListManager extends Component {

    sendPayment = (id) => {
        console.log(id)
        callApi( `manager/paid`, 'POST', {
            tid : id,
            uid : localStorage.getItem('uid')
        }).then(res => {
            if(res === undefined) {
                alert("Bạn chưa chọn bàn để thanh toán !")
            }else if(res.status === 409) {
                alert("Sap server roi huhu")
            } else if (res.status === 200 ){
                localStorage.removeItem("dishes");
                localStorage.removeItem("orderid");
                alert("Thanh toán thành công")
                return <Redirect to = "manager" />
            }
         })
    }


    showOrderList =(orderList) =>{
        if(orderList === undefined) {
            alert("Bàn này chưa có khách ngồi -> không thể thanh toán!")
        }
        else if(orderList !== undefined) {
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
        
    }
    render() {
        console.log(this.props.dishes)
        var totalMoney = 0;
        for(let i = 0; i< this.props.dishes.length; i++) {
            totalMoney = totalMoney + this.props.dishes[i].dish.price*this.props.dishes[i].quantity;
        }

        return (
            <div className="tab_right">
                <div className="thanh-t">
                    <label id="total-money"><b>Tổng Tiền :{totalMoney}đ</b> </label>
                    <button id="payment" onClick={this.sendPayment.bind(this,localStorage.getItem("tid"))}><i className="fa fa-credit-card-alt" aria-hidden="true">Payment</i></button>
                </div>
                <br />
                <h2>Bàn </h2>
                <ul className="one_dish" id="title-orderlist">
                    <li className="name_dish pay-item">Tên món ăn</li>
                    <li className="price_dish pay-item">Giá/món</li>
                    <li className="number_dish pay-item">Số lượng</li>
                    <li className="total_one pay-item"></li>
                </ul>
                {this.showOrderList(this.props.dishes)}

            </div>
        )
    }
}

export default OrderListManager;
