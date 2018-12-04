import React, { Component } from 'react';

class TablePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPick : this.props.table.ispick.is
        }
    }

    hadlePreview = (id) => {
        // console.log(id)
        this.props.handledishes(id);
    }
    render() {
        var {table} = this.props;
        var x = 'reservations';
        if(this.state.isPick === true) {
            x = 'reservations picked'
        }
        return (
            <div className = {x}>
                <div className="ban_content">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>Bàn số {table.num}</h2>
                    <p className="ban_st">Bàn {table.capacity} người</p>
                    <button className="ban_datcho" onClick = {this.hadlePreview.bind(this, table.ispick.oid)}>Thanh toán</button>
                </div>
            </div>
        );
    }
}

export default TablePayment;
