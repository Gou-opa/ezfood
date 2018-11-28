import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';
import callApi from '../../service/APIservice'

class TableNumber extends Component{

    componentWillMount() {
        callApi( 'manager/table', 'GET', null).then(res => {
            // console.log(res.data);
           this.setState({
               booked: res.data.booked,
               empty: res.data.empty
           })
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            booked: 0,
            empty: 0
        }
    };

    render(){

        const Box = posed.div({
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.2 },
            press: { scale: 1.1}
        })

        const data = this.state;
        console.log(data);

        return(
            <Col lg="2" sm="12">
                <Card className="card">
                    <CardHeader>
                        <CardTitle>Số lượng bàn</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Box>
                        <h3 className="font-light"> {data.booked} </h3>
                        <p className="text-muted"> Bàn đang phục vụ</p> </Box>
                        <hr/>
                        <Box>
                        <h3 className="font-light"> {data.empty}</h3>
                        <p className="text-muted"> Bàn còn trống</p>
                        </Box>
                    </CardBody>
                    
                </Card>  
            </Col>
        );
    }
}

export default TableNumber;