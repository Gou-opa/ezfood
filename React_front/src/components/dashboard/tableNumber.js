/*
*   author @Van Long
*/

import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';
import callApi from '../../service/APIservice'
import {uid} from "../../service/auth"

class TableNumber extends Component{

    componentWillMount() {
        callApi( `waiter/table/${uid}`, 'GET', null).then(res => {
            // console.log(res.data);
           this.setState({
               data: res.data
           })
        })
    }
    constructor() {
        super();
        this.state = {
          data: [],
          result: {
              booked: 0,
              empty: 0
          }           
        }
    }

    render(){
        var {data, result} = this.state;

        const Box = posed.div({
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.2 },
            press: { scale: 1.1}
        })
        
        if(data.length > 0){
            data.forEach( function(child) {
                child.tables.forEach( function(child){
                    if(child.ispick.is){
                        result.booked++;
                    }else{
                        result.empty++;
                    }
                })
            })
        }
    

        
        return(
            <Col lg="2" sm="12">
                <Card className="card">
                    <CardHeader>
                        <CardTitle>Số lượng bàn</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Box>
                        <h3 className="font-light"> {result.booked} </h3>
                        <p className="text-muted"> Bàn đang phục vụ</p> </Box>
                        <hr/>
                        <Box>
                        <h3 className="font-light"> {result.empty}</h3>
                        <p className="text-muted"> Bàn còn trống</p>
                        </Box>
                    </CardBody>
                    
                </Card>  
            </Col>
        );
    }
}

export default TableNumber;