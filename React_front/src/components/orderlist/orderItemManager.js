import React, { Component } from 'react';

class OrderItemManager extends Component {

    onDelete =(id)=> {
        this.props.handleDeleteDish(id);
    }
    
    printquantity =() =>{
        this.props.printquantity();
        return this.state.quantity;
    }
    render() {
        return (
            <div>
                <ul className="one_dish" >
                    <li className="name_dish pay-item">{this.props.data.dish.name}</li>
                    <li className="price_dish pay-item">{this.props.data.dish.price}</li>
                    <li className="number_dish pay-item">{this.props.data.quantity}</li>
                </ul>
            </div>
        );
    }
}

export default OrderItemManager;
