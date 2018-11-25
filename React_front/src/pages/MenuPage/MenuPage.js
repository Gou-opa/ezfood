import React, { Component } from 'react';
import Header from '../../components/header/header';
import LeftContent from '../../components/leftcontent/leftcontent';
import OrderList from '../../components/orderlist/orderlist';
import callApi from '../../service/APIservice'

class MenuPage extends Component {
    componentWillMount() {
        callApi( `menu.json`, 'GET', null).then(res => {
           this.setState({
               data : res.data
           })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    };
    
    render() {
        var {data} = this.state;
      
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftContent data= {data}/>
                    <OrderList />
                </div>
            </div>

        );
    }
}

export default MenuPage;
