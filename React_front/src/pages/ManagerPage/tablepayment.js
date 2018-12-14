import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import {uid} from '../../service/auth'
class TablePayment extends Component {
    hadlePreview = (id) => {
        // console.log(id)
        this.props.handledishes(id);
    }

    onDeleteTable = (id) => {
        callApi(`manager/table/${uid}`, 'DELETE', {
            tid : id
        }).then(res => {
            console.log(res);
        })
    }
    render() {
        var {table} = this.props;
        // console.log(table);
        var x = 'reservations';
        if(table.ispick.is === true) {
            x = 'reservations picked'
        }
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho" onClick = {this.hadlePreview.bind(this, table.tid)}>Thanh toán</button>
                    <button className="ban_datcho" onClick ={this.onDeleteTable.bind(this, table.tid)}>Xóa bàn</button>
                </div>
            </div>
        );
    }
}

export default TablePayment;
