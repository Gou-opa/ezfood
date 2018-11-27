import React, { Component } from 'react';
import callApi from '../../service/APIservice';

class TablePayment extends Component {

    hadlePayment = (id) => {
        console.log(id)
        callApi( `waiter/table`, 'POST', {
            tid : id
        }).then(res => {
           console.log(res.data);
         })

    }

    render() {
        var {table} = this.props;
        var x = 'reservations';
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho" onClick = {this.hadlePayment.bind(this, table._id)}>Thanh toán</button>
                </div>
            </div>
        );
    }
}

export default TablePayment;
