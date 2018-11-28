import React, { Component } from 'react';
import History from "./history";
import Demand from "./demand";
import {Col } from 'reactstrap';


class LeftTable extends Component{

    render(){
        return(
            <Col lg="6">
                <Demand />
                <History />
            </Col>
        );
    }
}

export default LeftTable;