import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';

class TableNumber extends Component{

    render(){
        return(
            <Col lg="2" sm="12">
                <Card className="card">
                    <CardHeader>
                        <CardTitle>Số lượng bàn</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter>
                        <i className="fa fa-table"></i>
                    </CardFooter>
                </Card>  
            </Col>
        );
    }
}

export default TableNumber;