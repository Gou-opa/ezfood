import React, { Component } from 'react';
import axios from 'axios';
import callApi from '../../service/APIservice';

class AddTableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      number: '',
      tid: '',
      capacity: '',
      ispick: false,
      added: false
        
    };
  }
  _handleSubmit(e) {
    e.preventDefault();
    var{level,number,tid,capacity,ispick} =this.state;
    console.log(this.state);

      callApi(`manager/table/add`, 'POST', {
        level : level,
        number : number,
        tid : tid,
        capacity: capacity,
        ispick: ispick
      }).then(res => {
          console.log(res);
          if(res.status == 200){
            alert('Thêm bàn thành công');
            this.setState({
              added: true
            });          
          }
      })
  }
  onHandleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
        [name]: value
    });
  }
    render() {
        return (
                <div className="addTableBox">
                  <h2>
                    Thêm Bàn
                  </h2>
                  <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input type="number" className="level" name="level" placeholder="Tầng số" onChange={this.onHandleChange.bind(this)}/>
                    <input type="number" className="number" name="number" placeholder="Bàn số" onChange={this.onHandleChange.bind(this)}/>
                    <input type="text" className="tid" name="tid" placeholder="Mã bàn" onChange={this.onHandleChange.bind(this)}/>
                    <input type="number" className="capacity" name="capacity" placeholder="Số lượng khách" onChange={this.onHandleChange.bind(this)}/>
                    <button type="submit"  onClick={(e)=>this._handleSubmit(e)} className="addTableBt">Thêm</button>
                  </form>
                  
                </div>
        );
    }
}

export default AddTableContent;