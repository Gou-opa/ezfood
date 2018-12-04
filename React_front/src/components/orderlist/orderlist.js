import React, { Component } from 'react';
import OrderItem from './orderItem';
class OrderList extends Component {

    
    showOrderList =(orderList) =>{
        var result = null;
        if(orderList.length >0 ){
            result =  orderList.map((orderItem, index)=> {
                return (
                    <OrderItem
                    key ={index}
                    data ={orderItem}
                    handleDeleteDish = {this.props.handleDeleteDish}
                    />
                )
            })
        }
        return result;
    }



    sendOrder =() => {
        // var totalMoney = this.countTotalMoney(this.props.dishpicked);
        // this.setState({
        //     totalMoney : totalMoney
        // })
        var orderList = this.props.dishes;
        if(orderList.length > 0) {
            alert("Đã gửi đơn hàng , Hân hạnh phục vụ quý khách !")
        } else {
            alert("Mời quý khách chọn món !")
        }
        this.props.handleOrderList();
    }

    // countTotalMoney=(dishpicked) => {
    //     var result = 0;
    //     dishpicked.map((dish, index) => {
    //         result = result + dish.price;
    //         return true;
    //     });
    //     return result;
    // }


    commaSeparateNumber(val){ 
        while (/(\d+)(\d{3})/.test(val.toString())){ 
         val = val.toString().replace(/(\d+)(\d{3})/, '$1'.concat(',','$2')); 
        } 
        return val; 
    } 
    render() {
    
        var orderList = this.props.dishes;
        var totalMoney = this.props.totalMoney;
        // console.log(orderList);
        return (
          
            <div className="tab_right">
                <div className="thanh-t">
                    <label  id="total-money"><b>Tổng Tiền : {this.commaSeparateNumber(totalMoney)} đ</b> </label>
                    <button id="payment" onClick = {this.sendOrder}><i className="fa fa-credit-card-alt" aria-hidden="true">Gọi món</i></button>
                </div>
                <br />
                <h2>Bàn {localStorage.getItem('numOftable')} - Tầng {localStorage.getItem('tabname')}</h2>

                <ul className="one_dish" id ="title-orderlist">
                    <li className="name_dish pay-item">Tên món ăn</li>
                    <li className="price_dish pay-item">Giá/món</li>
                    <li className="number_dish pay-item">Số lượng</li>
                    <li className="total_one pay-item"></li>
                    <li className="delete_dish pay-item">Xóa/món</li>
                </ul>
                {this.showOrderList(orderList)}
            </div>


        );
    }
}

export default OrderList;
