/*
*   author @Van Long
*/

import React, { Component } from 'react';
import Storekeeper from "./storekeeper";
import Demand from "./demand";
import {Col } from 'reactstrap';


class LeftTable extends Component{

    render(){
        return(
            <Col lg="6">
                <Demand />
                <Storekeeper />
            </Col>
        );
    }
}

export default LeftTable;