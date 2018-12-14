import React, { Component } from 'react';
import Header from '../../components/header/header';
import callApi from '../../service/APIservice'
import EditContent from '../../components/EditContent/EditContent';
import LeftcontenEditMenu from '../../components/leftcontent/leftcontenEditMenu';
import {uid} from '../../service/auth'
import { Redirect } from 'react-router-dom'

class EditMenu extends Component {
    componentWillMount() {
       console.log(uid)
        if(localStorage.getItem('infor') === null) {
            return;
        }
        callApi(`waiter/menu/${uid}`, 'GET', null).then(res => {
            console.log(res.data.menu)
            this.setState({
                data: res.data.menu,
            })
        })
        console.log(this.state.data);
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],           
        }
    };
    handleDeleteDish = (id, type) => {
        let dish = null;
        let { data } = this.state;
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
        console.log(dish);
        callApi(`manager/dish/${uid}`, 'DELETE', {
            _id: dish._id,         
          }).then(res => {
              console.log(dish._id);
              console.log(res);
              
          })

    }

    render() {
        var {data} = this.state;
        if (localStorage.getItem('infor') === null) {
            return <Redirect to='/login' />
        } else if (JSON.parse(localStorage.getItem("infor")).role !== 2) {
            return <Redirect to='/khongdu' />
        }
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftcontenEditMenu data= {data} handleDeleteDish={this.handleDeleteDish.bind(this)}/>
                    <EditContent></EditContent>
                </div>
            </div>

        );
    }
}

export default EditMenu;