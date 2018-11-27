import React, { Component } from 'react';
import Header from '../../components/header/header';
import DashBoard from '../../components/dashboard/dashboard';
import {Redirect} from 'react-router-dom'

class DashBoardPage extends Component {
    componentDidMount() {
        if(localStorage.getItem('uid') === null) {
            return;
        }
    }

    render() {

        if(localStorage.getItem('uid') === null) {
            return <Redirect to= '/login' />
        }
        return (
            <div>
                <Header />
                <DashBoard />
            </div>
        );
    }
}

export default DashBoardPage;
