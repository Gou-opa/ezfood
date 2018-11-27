import React, { Component } from 'react';

class OrderItemManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity : 0
        }
    }

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
                    <li className="name_dish pay-item">{this.props.data.name}</li>
                    <li className="price_dish pay-item">{this.props.data.price}</li>
                    <li className="number_dish pay-item"><input type="number" defaultValue={this.printquantity} name="true"  /></li>
                    <li className="total_one pay-item"></li>
                </ul>
            </div>
        );
    }
}

export default OrderItemManager;
