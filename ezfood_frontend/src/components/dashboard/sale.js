import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';

class Sale extends Component{

    render(){
        return(
            <Col lg="3" sm="12">
                <Card >
                    <CardHeader >
                        <CardTitle>Doanh thu</CardTitle>
                    </CardHeader>
                    <CardBody >
                    </CardBody>
                    <CardFooter >
                        <i className="fa fa-money"></i>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Sale;