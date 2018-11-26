import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';

class TableNumber extends Component{

    render(){
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
                        <h3 className="font-light"> {data.map( x => x.tableused )} </h3>
                        <p className="text-muted"> Bàn đang phục vụ</p>
                        <hr/>
                        <h3 className="font-light"> {data.map( x => x.tableavailabe )}</h3>
                        <p className="text-muted"> Bàn còn trống</p>
                    </CardBody>
                    
                </Card>  
            </Col>
        );
    }
}

export default TableNumber;