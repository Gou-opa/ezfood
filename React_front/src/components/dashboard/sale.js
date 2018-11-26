import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';


class Sale extends Component{

    

    render(){
        
        const Box = posed.div({
            focusable: true,
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.1}
        })

        var data = [{ 
            saleToday: 6900000
            }]

        return(
            <Col lg="3" sm="12">
                
                <Card >
                    <CardHeader >
                        <CardTitle>Doanh thu</CardTitle>
                        <hr/>
                    </CardHeader>
                    <Box>
                    <CardBody >
                        <div className="round round-lg align-self-center round-info"><i className="fas fa-wallet"></i></div>
                        <div style={{display: "inline-flex"}}>   
                            <h3 className="font-light"> {data.map( x => x.saleToday )}</h3>
                            <p className="text-muted">VNĐ</p>
                        </div>
                    </CardBody>
                    </Box>
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