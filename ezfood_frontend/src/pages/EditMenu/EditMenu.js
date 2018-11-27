import React, { Component } from 'react';
import Header from '../../components/header/header';
import OrderList from '../../components/orderlist/orderlist';
import callApi from '../../service/APIservice'
import LeftContentMenu from '../../components/leftcontent/leftcontentMenu';
import leftcontenEditMenu from '../../components/leftcontent/leftcontenEditMenu';
import EditContent from '../../components/EditContent/EditContent';

class EditMenu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    };

    render() {
        var {data,dishpicked} = this.state;
        return (
            <div>
                <Header />
                <div >
                    <EditContent></EditContent>
                </div>
            </div>

        );
    }
}

export default EditMenu;