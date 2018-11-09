import React, { Component } from 'react';

class OneDish extends Component {
  render() {
    return (
        <div className="order_one_dish">
        <img src="../images/ga.jpg" alt="x" className="one_dash_img" />
        <div className="about_dish">
          <h2>Gà quay cả con</h2>
          <h5 className="one_dish_price">100.000đ</h5>
          <button type="submit"><i className="fa fa-plus" aria-hidden="true"> Order</i></button>
        </div>
      </div>
    );
  } 
}

export default OneDish;
