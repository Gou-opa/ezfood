import React, { Component } from 'react';
import ChartLine from './chartLine';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose'

class Chart extends Component{

    constructor(){
        super();
        this.state = {
          chartData:{}
        }
    }
    
    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
            datasets:[
              {
                label:'Doanh thu',
                data: [35, 10, 35, 42, 36, 66, 69],
                backgroundColor: "#ff6491",
                borderColor: '#ffc107',
              }
            ]
          }
        });
    }

    render(){
        const Box = posed.div({
            focusable: true,
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.07 },
            press: { scale: 1.05}
        })

        return(
            <Col lg="7" md="12" sm="12">
                <Card>
                    <CardHeader >
                        <CardTitle>Báo cáo</CardTitle>
                    </CardHeader>
                    <Box>
                    <CardBody >
                        <ChartLine chartData={this.state.chartData} legendPosition="top" />
                    </CardBody>
                    </Box>
                    <CardFooter >
                        <i className="fa fa-info-circle"></i> Doanh thu tuần này
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Chart;