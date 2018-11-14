import React, { Component } from 'react';
class Dashbroad extends Component {
    constructor(props){
      super(props);
      this.state = {
        historyList: [
          {
            Name: "Tôm hùm",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Cá hấp",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Gà rán",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Ốc hương",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },{
            Name: "Tôm hùm",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Cá hấp",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Gà rán",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Ốc hương",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },{
            Name: "Tôm hùm",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Cá hấp",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Gà rán",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          },
          {
            Name: "Ốc hương",
            Table: "1a",
            Number: 3,
            price: "1 000 000"
          }
        ],
        numberTable: 11,
        money:1000000
      }
    }
    showHistory = () =>{
      
      var result = this.state.historyList.map((item) =>
         <tr><td>{item.Name}</td><td>{item.Table}</td><td>{item.Number}</td><td>{item.price}</td></tr>        
      );
      return result;
    }
    render() {
        return (
            <div className="container-dashboard">
        <div className="row-dashboard">
          <div className="dashboard-box">  
            <div className="da-box-header"><h4>Số lượt phục vụ trong ngày(theo bàn):</h4></div>
            <h3>{this.state.numberTable}</h3>
          </div>
          <div className="dashboard-box"> 
            <div className="da-box-header"><h4>Doanh thu:</h4></div> 
            <h3>{this.state.money}</h3>
          </div>            
          <div className="dashboard-review">  
            <h4>Báo Cáo:</h4>
          </div>
        </div>
        <div className="row">
          {/* begin left column */}
          <div className="table-box">
            <div className="box-header">Lịch sử đặt món</div>
            <div className="box-body">
              <table>
                <colgroup>
                  <col width="35%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="35%" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">Món</th>
                    <th scope="col">Bàn</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {this.showHistory()}                               
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <i className="fas fa-history" />
              Lịch sử gần đây
            </div>
          </div>
        </div>           
      </div>


        );
    }
}

export default Dashbroad;
