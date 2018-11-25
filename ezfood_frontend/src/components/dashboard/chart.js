import React, { Component } from 'react';
import ChartLine from './chartLine';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';


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
                backgroundColor: "#ef3447",
                borderColor: '#ffc107',
              }
            ]
          }
        });
    }

    render(){
        return(
            <Col lg="7" md="12" sm="12">
                <Card>
                    <CardHeader >
                        <CardTitle>Báo cáo</CardTitle>
                    </CardHeader>
                    <CardBody >
                        <ChartLine chartData={this.state.chartData} legendPosition="top" />
                    </CardBody>
                    <CardFooter >
                        <i className="fa fa-info-circle"></i> Doanh thu tuần này
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Chart;