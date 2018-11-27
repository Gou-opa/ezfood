import React, { Component } from 'react';
import Header from '../../components/header/header';
import callApi from '../../service/APIservice'
import EditContent from '../../components/EditContent/EditContent';
import LeftContentMenu from '../../components/leftcontent/leftcontentMenu';
import LeftcontenEditMenu from '../../components/leftcontent/leftcontenEditMenu';

class EditMenu extends Component {
    
    componentWillMount() {
        callApi( 'waiter/menu', 'GET', null).then(res => {
            // console.log(res.data.menu)
           this.setState({
               data : res.data.menu
           })
        })
        console.log(this.state.data);
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            dishpicked : [ ]
        }
    };
    

    render() {
        var {data,dishpicked} = this.state;
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftcontenEditMenu data= {data} />
                    <EditContent></EditContent>
                </div>
            </div>

        );
    }
}

export default EditMenu;