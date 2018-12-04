import React, { Component } from 'react';
class Dish extends Component {

    handleClick =(id, type)=> {
        this.props.handleDishPicked(id,type)
    }
    commaSeparateNumber(val){ 
        while (/(\d+)(\d{3})/.test(val.toString())){ 
         val = val.toString().replace(/(\d+)(\d{3})/, '$1'.concat(',','$2')); 
        } 
        return val; 
    } 
    render() {
        var {dish} = this.props;
        return (
            <div className="order_one_dish">
                <img src={dish.url} alt="a" className="one_dash_img" />
                <div className="about_dish">
                    <h2>{dish.name}</h2>
                    <h5 className="one_dish_price">{this.commaSeparateNumber(dish.price)}</h5>
                    <button type="button" 
                    onClick={this.handleClick.bind(this, dish._id, dish.type)}><i className="fa fa-plus" aria-hidden="true"> Order</i></button>
                </div>
            </div>
        );
    }
}

export default Dish;
