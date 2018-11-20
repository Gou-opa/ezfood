import React, { Component } from 'react';
// import callApi from '../../service/APIservice'
class Dish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish : this.props.dish
        }
    }

    handleClick =(id)=> {
        console.log(id);
        console.log(this.state.dish);
        if(id === this.state.dish._id) {
            this.props.handleDishPicked(this.state.dish)
        }
     }

    render() {
        var {dish} = this.props;
        // console.log(dish);
        return (
            <div className="order_one_dish">
                <img src={dish.url} alt="a" className="one_dash_img" />
                <div className="about_dish">
                    <h2>{dish.name}</h2>
                    <h5 className="one_dish_price">{dish.price}</h5>
                    <button type="button" 
                    onClick={this.handleClick.bind(this, dish._id)}><i className="fa fa-plus" aria-hidden="true"> Order</i></button>
                </div>
            </div>
        );
    }
}

export default Dish;
