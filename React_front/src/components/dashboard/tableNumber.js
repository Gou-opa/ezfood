import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';

class TableNumber extends Component{

    render(){

        const Box = posed.div({
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.2 },
            press: { scale: 1.1}
        })

        var data = [{ 
                tableused: 35,
                tableavailabe: 15
        }]

        return(
            <Col lg="2" sm="12">
                <Card className="card">
                    <CardHeader>
                        <CardTitle>Số lượng bàn</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Box>
                        <h3 className="font-light"> {data.map( x => x.tableused )} </h3>
                        <p className="text-muted"> Bàn đang phục vụ</p> </Box>
                        <hr/>
                        <Box>
                        <h3 className="font-light"> {data.map( x => x.tableavailabe )}</h3>
                        <p className="text-muted"> Bàn còn trống</p>
                        </Box>
                    </CardBody>
                    
                </Card>  
            </Col>
        );
    }
}

export default TableNumber;