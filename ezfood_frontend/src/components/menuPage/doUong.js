import React, { Component } from 'react';
// import OneDish from './oneDish';
class DoUong extends Component {
    render() {
        return (
            <div id="Douong" className="tabcontent">
                <div className="order_one_dish">
                    <img src="../images/coca.jpg" alt="x" className="one_dash_img" />
                    <div className="about_dish">
                        <h2>Coca cola</h2>
                        <h5 className="one_dish_price">10.000đ</h5>
                        <button type="submit"><i className="fa fa-plus" aria-hidden="true"> Order</i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DoUong;
