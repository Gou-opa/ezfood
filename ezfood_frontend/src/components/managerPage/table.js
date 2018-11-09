import React, { Component } from 'react';

class Table extends Component {
    render() {
        return (
            <div className="reservations picked">
                    <div className="ban_content">
                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                        <h2>Bàn số</h2>
                        <p className="ban_st">Empty</p>
                        <button className="ban_datcho">Picked</button>
                        <button className="ban_payment">Payment</button>
                    </div>
                </div>
        );
    }
}

export default Table;
