import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import callApi from '../../service/APIservice';
class Table extends Component {

    constructor(props) {
        super(props);
        this.state={
            isPick : false,
            displayPick : 'Pick'
        }
    }

    onPickTable = (id, num) => {
        localStorage.setItem('numOftable',num )
        callApi('waiter/table/pick', 'POST', {
            uid : localStorage.getItem('uid'),
            tid : id,
            is : true
        }).then(res => {
            console.log(res.data);
            if(res.status === 200 ) {
                localStorage.setItem('orderid', res.data._id);
            } else   {
                alert('tai khoan khong chinh xac !')
            }
         })
        this.setState ({
            isPick : true,
            displayPick : 'Picked'
        })
    }

    render() {
        console.log(this.props.table)
        if(this.state.isPick === true) {
            return <Redirect to= '/menu'/>
        } 
        var {table} = this.props;
        var {isPick,displayPick} = this.state;
        var x = 'reservations';
        if(isPick === true) {
            x = 'reservations picked';
        }
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho" onClick ={this.onPickTable.bind(this, table._id, table.num)}>{displayPick}</button>
                </div>
            </div>
        );
    }
}

export default Table;
