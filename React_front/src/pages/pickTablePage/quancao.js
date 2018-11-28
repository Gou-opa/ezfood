import React, { Component } from 'react';
class QuangCao extends Component {
    render() {
        return (
            <div className="tab_right">
                <h2>Ez food ăn là không chờ đợi</h2>
                <div className="process">
                    <div className="pick-table box-border">
                        Chọn bàn
                    </div>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    <div className="pick-dish box-border">Chọn món</div>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    <div className="order-dish box-border">Gọi món</div>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    <div className="payment-process box-border">Thưởng thức</div>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    <div className="payment-process box-border">Thanh toán</div>
                </div>

            </div>
        )
    }
}

export default QuangCao;
