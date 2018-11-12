import React, { Component } from 'react';

class Dish extends Component {



    render() {
        var {dish} = this.props;
        return (
            <div className="order_one_dish">
                <img src={dish.img} alt="a" className="one_dash_img" />
                <div className="about_dish">
                    <h2>{dish.name}</h2>
                    <h5 className="one_dish_price">{dish.price}</h5>
                    <button type="submit"><i className="fa fa-plus" aria-hidden="true"> Order</i></button>
                </div>
            </div>
        );
    }
}

export default Dish;
