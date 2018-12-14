import React, { Component } from 'react';
//import callApi from '../../service/APIservice';
class Previewdish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish : this.props.dish
        }
    }

    deleteDish =(id,type,name)=> {
        this.props.handleDeleteDish(id,type)
        // var{type,name,price,unit,filename} =this.state;
        // console.log(this.state);        
        //   callApi(`manager/dish`, 'POST', {
            
        //   }).then(res => {
        //       console.log(res);
        //       if(res.status == 200){
                 alert('Bạn đã xóa món '+ name);
        //       }
        //   })
        //   callApi(`manager/dish`, 'POST', this.state.file).then(res => {
        //       console.log(res);
              
        //   })                
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
                    onClick={this.deleteDish.bind(this, dish._id,dish.type,dish.name)}><i className="fa" aria-hidden="true"> Xóa món</i></button>
                </div>
            </div>
        );
    }
}

export default Previewdish;