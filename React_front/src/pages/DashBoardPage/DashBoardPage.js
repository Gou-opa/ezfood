import React, { Component } from 'react';
import Header from '../../components/header/header';
import DashBoard from '../../components/dashboard/dashboard';


class DashBoardPage extends Component {

    render() {

        return (
            <div>
                <Header />
                <DashBoard />
            </div>
        );
    }
}

export default DashBoardPage;
