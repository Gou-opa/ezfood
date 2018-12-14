import React, { Component } from 'react';

class OrderItem extends Component {

    onDelete = (id) => {
        this.props.handleDeleteDish(id);
    }

    componentDidMount() {
        this.setState({
            quantity: this.props.data.quantity
        })
    }

    commaSeparateNumber(val){ 
        while (/(\d+)(\d{3})/.test(val.toString())){ 
         val = val.toString().replace(/(\d+)(\d{3})/, '$1'.concat(',','$2')); 
        } 
        return val; 
    } 
    render() {
        var dish_quantity = this.props.data;
        return (

            <ul className="one_dish" >
                <li className="name_dish pay-item">{dish_quantity.dish.name}</li>
                <li className="price_dish pay-item">{this.commaSeparateNumber(dish_quantity.dish.price)}</li>
                <li className="number_dish pay-item">{dish_quantity.quantity}</li>
                <li className="total_one pay-item"></li>
                <li onClick={this.onDelete.bind(this, dish_quantity.dish._id)} className="delete_dish pay-item"><i className="fa fa-trash" aria-hidden="true" /></li>
            </ul>

        );
    }
}

export default OrderItem;
