import React, { Component } from 'react';

class OrderList extends Component {
    render() {
        return (
            <div className="tab_right">
                <div className="thanh-t">
                    <label  id="total-money">Tổng : 3.000.000đ</label>
                    <button id="payment"><i className="fa fa-credit-card-alt" aria-hidden="true"> Send</i></button>
                </div>
                <h2>Ban1 - Tang1</h2>
                <ul className="one_dish">
                    <li className="name_dish pay-item">Nem công chả phương</li>
                    <li className="price_dish pay-item">100.000đ</li>
                    <li className="number_dish pay-item"><input type="number" defaultValue={3} name="true"  /></li>
                    <li className="total_one pay-item">100.000đ</li>
                    <li className="delete_dish pay-item"><i className="fa fa-trash" aria-hidden="true" /></li>
                </ul>
                <ul className="one_dish">
                    <li className="name_dish pay-item">Bia Ha Noi</li>
                    <li className="price_dish pay-item">10.000đ</li>
                    <li className="number_dish pay-item"><input type="number" name="true" defaultValue={10} /></li>
                    <li className="total_one pay-item">100.000đ</li>
                    <li className="delete_dish pay-item"><i className="fa fa-trash" aria-hidden="true" /></li>
                </ul>
                <ul className="one_dish">
                    <li className="name_dish pay-item">Bia Ha Noi</li>
                    <li className="price_dish pay-item">10.000đ</li>
                    <li className="number_dish pay-item"><input type="number" name="true"  defaultValue={100} /></li>
                    <li className="total_one pay-item">100.000.000đ</li>
                    <li className="delete_dish pay-item"><i className="fa fa-trash" aria-hidden="true" /></li>
                </ul>
            </div>


        );
    }
}

export default OrderList;
