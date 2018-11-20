import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import LeftContentManager from '../../components/leftcontent/leftcontenManager';

class ManagerPage extends Component {
    componentWillMount() {
        callApi( `waiter/table`, 'GET', null).then(res => {
           this.setState({
               data : res.data
           })
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            tablePicked : []
        }
    };

    render() {
        console.log(console.log(this.state.data));
        var {data,tablePicked} = this.state
        return (
            <div>
                <Header />
                <div id="wrap">
                <LeftContentManager data= {data} tablePicked={tablePicked} />

                </div>
            </div>

        );
    }
}

export default ManagerPage;
