import React, { Component } from 'react';
import Header from '../../components/header/header';
import OrderList from '../../components/orderlist/orderlist';
import callApi from '../../service/APIservice'
import LeftContentMenu from '../../components/leftcontent/leftcontentMenu';
// import callApiAo from '../../service/APIao';

class MenuPage extends Component {
    componentWillMount() {
        callApi( 'waiter/menu', 'GET', null).then(res => {
            // console.log(res.data.menu)
           this.setState({
               data : res.data.menu
           })
        })

        // callApiAo('menu', 'GET', null).then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         data : res.data
        //     })
        // })
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            dishpicked : [ ]
        }
    };

    handleDishPicked =(dish) => {
        var {dishpicked} = this.state;
        dishpicked.push(dish);
        console.log(dishpicked);
        localStorage.setItem('dishes', JSON.stringify(dishpicked)); 
        this.setState({
            datapicked :dishpicked
        })

    }
    
    handleDeleteDish =(id) => {
        
        var {dishpicked} = this.state;
        for(let i = 0; i< dishpicked.length; i ++) {
            if(dishpicked[i].id === id) {
                dishpicked.splice(i,1);
            }
        }
        this.setState({
            dishes : dishpicked
        })
        // thay vi set state co the post len API
    }

    filterDishes(arr) {
        var {dishpicked} = this.state;
        var unique = arr.filter((value, index, thisarr) => thisarr.indexOf(value)=== index);
        var uniquequantity = [];
        
        unique.map((univalue, index) => {
           var quantity =  dishpicked.filter(thisvalue => thisvalue === univalue).length;
           uniquequantity.push({
               dish : univalue,
               quantity : quantity
           })
        })
        return uniquequantity;
    }

    handleOrderList =() => {
        var dishes = this.filterDishes(this.state.dishpicked);
        // console.log(dishes);
        var postobj = {
            order_id : localStorage.getItem('orderid'),
            dishes : dishes
        }
        // console.log(postobj);
         callApi( `waiter/order/update`, 'POST', postobj ).then(res => {
           console.log(res.data);
        })
        // console.log(localStorage.getItem('dishes'));
    }
    render() {
        var {data,dishpicked} = this.state;
        console.log(this.state);
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftContentMenu data= {data} dishpicked={dishpicked} handleDishPicked={this.handleDishPicked.bind(this)}/>
                    <OrderList dishpicked = {dishpicked} handleDeleteDish={this.handleDeleteDish.bind(this)} handleOrderList={this.handleOrderList} />
                </div>
            </div>

        );
    }
}

export default MenuPage;
