import React, { Component } from 'react';
import callApi from '../../service/APIservice';
import {uid} from '../../service/auth'
class TablePayment extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            isPreview : false
        }
    }

    hadlePreview = (id, num) => {
        // console.log(id)
        this.props.handledishes(id, num);
    }

    handleToOrder = () =>{
        this.props.printDocument()
        this.setState({
            isPreview : true
        })
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
        // console.log(table.tid)
        // console.log(table);
        var x = 'reservations';
        if(table.ispick.is === true && this.state.isPreview === false) {
            x = 'reservations picked'
        } else if(table.ispick.is === true && this.state.isPreview === true) {
            x = 'reservations picked preview-order'
        }
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho " onClick = {this.hadlePreview.bind(this, table.tid, table.num)}>Xem đơn</button>
                    <button className="ban_datcho" onClick ={this.onDeleteTable.bind(this, table.tid)}>Xóa bàn</button>
                    <button className="ban_datcho preview" onClick = {this.handleToOrder.bind(this, table.tid)}>Gửi bếp</button>

                </div>
            </div>
        );
    }
}

export default TablePayment;
