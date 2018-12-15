import React, { Component } from 'react';
import Header from '../../components/header/header';
import { Redirect } from 'react-router-dom'
import AddTableContent from '../../components/AddTable/addTableContent';

class AddTablePage extends Component {
    render() {
        if (JSON.parse(localStorage.getItem("infor")) === null) {
            return <Redirect to='/login' />
        } else if (JSON.parse(localStorage.getItem("infor")).role !== 2) {
            return <Redirect to='/khongdu' />
        }
        return (
            <div>
                <Header />
                <AddTableContent></AddTableContent>
            </div>
        );
    }
}

export default AddTablePage;