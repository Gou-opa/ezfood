import React, { Component } from 'react';
import Header from '../../components/header/header';
import DashBoard from '../../components/dashboard/dashboard';
import { Redirect } from 'react-router-dom'


class DashBoardPage extends Component {

    render() {

        if (localStorage.getItem('infor') === null) {
            return <Redirect to='/login' />
        } else if (JSON.parse(localStorage.getItem("infor")).role !== 2) {
            return <Redirect to='/khongdu' />
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
