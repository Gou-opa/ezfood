import React, { Component } from 'react';
import Header from '../../components/header/header';
import OrderList from '../../components/orderlist/orderlist';
import callApi from '../../service/APIservice'
import LeftContentMenu from '../../components/leftcontent/leftcontentMenu';
import {Redirect} from 'react-router-dom'
import {uid} from '../../service/auth'
class MenuPage extends Component {

    componentDidMount() {
        if (localStorage.getItem('infor') === null) {
            return;
        }
        this.interval = setInterval(() => {
            callApi(`waiter/menu/${uid}`, 'GET', null).then(res => {
                // console.log(res.data.menu)
                this.setState({
                    data: res.data.menu,
                })
            })
        }, 5000)
    }

    componentWillMount() {

        clearInterval(this.interval);

    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dishpicked: [],
            totalMoney: 0
        }
    };

    countTotalMoney = (dishpicked) => {
        var result = 0;
        dishpicked.map((dish, index) => {
            result = result + dish.price;
            return true;
        });
        return result;
    }

    handleDishPicked = (id, type) => {
        let dish = null;
        let { data } = this.state;
        let dishpicked = (localStorage.getItem('dishes') !== 'undefined' && localStorage.getItem('dishes') !== null) ? JSON.parse(localStorage.getItem('dishes')) : this.state.dishpicked
                data.map((list, index) => {
                    if (list.type === type) {
                        list.dishes.map((dishreal, index) => {
                            if (dishreal._id === id) {
                                dish = dishreal;
                            }
                            return true;
                        })
                    }
                    return true;
                })
        var _data = {
            dish: dish,
            order_id: JSON.parse(localStorage.getItem('infor')).order
        }
        callApi(`waiter/order/add/${uid}`, 'POST', _data).then(res => {
            if(res.status === 220) {
                alert("Rất xin lỗi quý khách , Nguyên liệu cho món này không đủ !")
            } else if(res.status === 200) {
                dishpicked.push(dish);
                let totalMoney = this.countTotalMoney(dishpicked)
                localStorage.setItem('totalMoney', totalMoney);
                localStorage.setItem('dishes', JSON.stringify(dishpicked));
                this.setState({
                    datapicked: dishpicked,
                    totalMoney: totalMoney
                })
        
            }
            console.log(res)
        })

       
        // console.log(dishpicked);
    }

    handleDeleteDish = (id) => {

        let dishpicked = (localStorage.getItem('dishes') !== 'undefined' && localStorage.getItem('dishes') !== null) ? JSON.parse(localStorage.getItem('dishes')) : this.state.dishpicked
        var totalMoney = (localStorage.getItem('totalMoney') !== 'undefined' && localStorage.getItem('totalMoney') !== null) ? JSON.parse(localStorage.getItem('totalMoney')) : 0
        for (let i = 0; i < dishpicked.length; i++) {
            if (dishpicked[i]._id === id) {
                totalMoney = totalMoney - dishpicked[i].price
                dishpicked.splice(i, 1);
                break;
            }
        }
        callApi(`waiter/order/dish/${uid}`, 'DELETE', {
            _id : id,
            did : localStorage.getItem("orderid")
        }).then(res => {
            console.log(res.data)
        })
        localStorage.setItem('dishes', JSON.stringify(dishpicked));
        localStorage.setItem('totalMoney', totalMoney);
        this.setState({
            dishes: dishpicked,
            totalMoney: totalMoney
        })
        // thay vi set state co the post len API
    }

    duplicate = (arr)=> {
        return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    }

    filterDishes(arr) {
        // var dishpicked = (localStorage.getItem('dishes') !== 'undefined' && localStorage.getItem('dishes') !== null) ? JSON.parse(localStorage.getItem('dishes')) : this.state.dishpicked
        var unique = this.duplicate(arr);
        // console.log(unique);
        var uniquequantity = [];
        unique.map((univalue, index) => {
            var quantity = arr.filter(thisvalue => JSON.stringify(thisvalue) === JSON.stringify(univalue)).length;
            uniquequantity.push({
                dish: univalue,
                quantity: quantity
            })
            return true;
        })
        return uniquequantity;
    }

    handleOrderList = () => {
         var dishpicked = (localStorage.getItem('dishes') !== 'undefined' && localStorage.getItem('dishes') !== null) ? JSON.parse(localStorage.getItem('dishes')) : this.state.dishpicked
        var dishes = this.filterDishes(dishpicked);
        // console.log(dishes);
        var postobj = {
            order_id: localStorage.getItem('orderid'),
            dishes: dishes
        }
        // console.log(postobj);
        callApi(`waiter/order/update/${uid}`, 'POST', postobj).then(res => {
            // console.log(res.status);
        })
    }

    render() {
        localStorage.removeItem("picked")
        if(uid === null) {
            return <Redirect to= '/picktable' />
        } else if(JSON.parse(localStorage.getItem("infor")).role !== 1) {
            return <Redirect to='/khongdu' />
        }
        var { data } = this.state;
        var totalMoney = (localStorage.getItem('totalMoney') !== 'undefined' && localStorage.getItem('totalMoney') !== null) ? JSON.parse(localStorage.getItem('totalMoney')) : 0
        var dishpicked = (localStorage.getItem('dishes') !== 'undefined' && localStorage.getItem('dishes') !== null) ? JSON.parse(localStorage.getItem('dishes')) : this.state.dishpicked
        var dishes = this.filterDishes(dishpicked);
        // console.log(dishpicked)
        // var {data,dishpicked} = this.state;
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftContentMenu data={data} dishpicked={dishpicked} handleDishPicked={this.handleDishPicked.bind(this)} />
                    <OrderList dishes={dishes} handleDeleteDish={this.handleDeleteDish.bind(this)} handleOrderList={this.handleOrderList} totalMoney={totalMoney} />
                </div>
            </div>

        );
    }
}

export default MenuPage;
