import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import callApi from '../../service/APIservice';
import {uid} from "../../service/auth"
class Table extends Component {

    constructor(props) {
        super(props);
        this.state={
            isPick : (this.props.table.ispick === undefined ) ? false : this.props.table.ispick.is
        }
    }

    onPickTable = (id, num) => {
        
        localStorage.removeItem("dishes")
        localStorage.setItem('numOftable',num)
        callApi(`waiter/table/pick/`, 'POST', {
            uid : uid,
            tid : id
        }).then(res => {
            // console.log(res.data);
            if(res.status === 200 ) {
                var x = JSON.parse(localStorage.getItem("infor"));
                x.order = res.data._id;
                localStorage.setItem('infor', JSON.stringify(x));
            } else   {
                alert('tai khoan khong chinh xac !')
            }
         })
         this.setState({
             displayPick : 'Picked'
         })
         localStorage.setItem("picked", true)
        //  localStorage.setItem("tid" , id);
    }


    render() {
        var {table} = this.props;
        console.log(table);
        if(JSON.parse(localStorage.getItem("picked")) === true) {
            return <Redirect to= '/menu'/>
        } 
        var {isPick} = this.state;
        var x = 'reservations';
        var y = 'Pick';
        if(isPick === true) {
            x = 'reservations picked hiddenButton';
            y = 'Picked';
        }
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho hidden" onClick ={this.onPickTable.bind(this, table.tid, table.num)}>{y}</button>
                </div>
            </div>
        );
    }
}

export default Table;
