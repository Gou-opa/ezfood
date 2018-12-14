/*
*   author @Van Long
*/

import React, { Component } from 'react';
import Clock from "./clock/clock";
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';

import callApi from '../../service/APIservice'
//authentication
import {uid} from "../../service/auth"


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Sale extends Component{

    constructor() {
        super();
        this.state = {
          data: [],
          result: {
              Day: "12-12-2018",
              value: 1000000
          }            
        }
    }

    componentDidMount() {
        callApi( `manager/evaluate/${uid}`, 'GET', null).then(res => {
            // console.log(res.data);
           this.setState({
              data: res.data,
              result: {
                Day: "12-12-2018",
                value: 1000000
                }
           })
        })
    }
    
    
    
    render(){
        
        const Box = posed.div({
            focusable: true,
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.1}
        })
        
        // data.map( x => x.saleToday 
        var data = this.state.data;
        var result = this.state.result;
        if(data.length >0 ){
            result = data[data.length-1];
        }
            
        return(
            
            <Col lg="3" sm="12">
                
                <Card >
                    <CardHeader >
                        <CardTitle>Doanh thu</CardTitle>
                    </CardHeader>
                    <Box>
                    <CardBody >
                        <div className="round round-lg align-self-center round-info"><i className="fas fa-wallet"></i></div>
                        <div style={{display: "inline-flex"}}>   
                            <h3 className="font-light"> {numberWithCommas(result.value)}</h3>
                            <p className="text-muted">VNĐ</p>
                        </div>
                    </CardBody>
                    </Box>
                    <CardFooter >
                        <i className="far fa-calendar-alt"></i>
                        &nbsp;Doanh thu hôm nay
                    </CardFooter>
                </Card>
                <Clock />
            </Col>
        );
    }
}

export default Sale;