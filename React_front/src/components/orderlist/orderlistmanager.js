import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import OrderItemManager from './orderItemManager'
import { uid } from '../../service/auth'

class OrderListManager extends Component {

    sendPayment = (id) => {
        console.log(id)
        callApi( `manager/paid/${uid}`, 'POST', {
            tid : id
        }).then(res => {
            if(res === undefined) {
                alert("Bạn chưa chọn bàn để thanh toán !")
            }else if(res.status === 409) {
                alert("Sap server roi huhu")
            } else if (res.status === 200 ){
                // localStorage.removeItem("dishes");
                // localStorage.removeItem("orderid");
                this.props.completePayment(id);
                alert("Thanh toán thành công")
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
                        />
                    )
                })
            }
            return result;
        }
        
    }
    commaSeparateNumber(val){ 
        while (/(\d+)(\d{3})/.test(val.toString())){ 
         val = val.toString().replace(/(\d+)(\d{3})/, '$1'.concat(',','$2')); 
        } 
        return val; 
    } 
    render() {
        // console.log(this.props.dishes)
        var totalMoney = 0;
        for(let i = 0; i< this.props.dishes.length; i++) {
            totalMoney = totalMoney + this.props.dishes[i].dish.price*this.props.dishes[i].quantity;
        }
        return (
            <div className="tab_right " id = "divToPrint" >
                <div className="thanh-t">
                    <label id="total-money"><b>Tổng Tiền :{this.commaSeparateNumber(totalMoney)}đ</b> </label>
                    <button id="payment" onClick={this.sendPayment.bind(this,localStorage.getItem("tid"))}><i className="fa fa-credit-card-alt" aria-hidden="true">Thanh toán</i></button>
                </div>
                <br />
                <h2>Bàn {localStorage.getItem("tnum")} - Tầng{localStorage.getItem("tabname")} </h2>
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
