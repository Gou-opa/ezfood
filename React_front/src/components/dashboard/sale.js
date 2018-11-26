import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';

class Sale extends Component{

    render(){
        var data = [{ 
            saleToday: 6900000
            }]

        return(
            <Col lg="3" sm="12">
                <Card >
                    <CardHeader >
                        <CardTitle>Doanh thu</CardTitle>
                    </CardHeader>
                    <CardBody >
                        <div className="round round-lg align-self-center round-info"><i className="fas fa-wallet"></i></div>
                        <div style={{display: "inline-flex"}}>   
                            <h3 className="font-light"> {data.map( x => x.saleToday )}</h3>
                            <p className="text-muted">VNĐ</p>
                        </div>
                    </CardBody>
                    <CardFooter >
                        <i className="far fa-calendar-alt"></i>
                        &nbsp;Doanh thu hôm nay
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Sale;