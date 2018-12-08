import React, { Component } from 'react';
import Header from '../../components/header/header';
//import callApi from '../../service/APIservice'
import AddTableContent from '../../components/AddTable/addTableContent';

class AddTablePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <AddTableContent></AddTableContent>
            </div>
        );
    }
}

export default AddTablePage;