import React, { Component } from 'react';
import callApi from '../../service/APIservice';

class OrderListManager extends Component {
    sendPayment = () => {
        // var totalMoney = this.countTotalMoney(this.props.totalMoney);
        // callApi('waiter/pay', 'POST', {
        //     orderid: localStorage.getItem('orderid'),
        //     estimate: totalMoney
        // }).then(res => {
        //     console.log(res.data)
        //     if (res.status === 200) {
        //         alert('thanh cong');
        //     } else {
        //         alert("Lỗi giao dịch !")
        //     }
        // })
        // this.setState({
        //     totalMoney: totalMoney
        // })

        alert("confirm thanh toan")
    }

    render() {
        return (
            <div className="tab_right">
                <div className="thanh-t">
                    <label id="total-money"><b>Tổng Tiền : 0 đ</b> </label>
                    <button id="payment" onClick={this.sendPayment}><i className="fa fa-credit-card-alt" aria-hidden="true">Payment</i></button>
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
