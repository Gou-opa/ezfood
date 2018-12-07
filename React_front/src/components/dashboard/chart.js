/*
*   author @Van Long
*/

import React, { Component } from 'react';
import ChartLine from './chartLine';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';
import callApi from '../../service/APIservice'


class Chart extends Component{
    
    constructor(){
        super();
        this.state = {
        chartData:{
            labels: ["6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua", "Hôm nay"],
            datasets:[
                {
                label:'Doanh thu',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "#ff6491",
                borderColor: '#ffc107',
                }
            ]
        },
        data: {}
        }
    }
    
    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
        callApi( 'manager/evaluate', 'GET', null).then(res => {
           console.log(res.data);
           this.setState({
                data: res.data,
                chartData:{
                    labels: ["6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua", "Hôm nay"],
                    datasets:[
                      {
                        label:'Doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: "#ff6491",
                        borderColor: '#ffc107',
                      }
                    ]
                }
                
           });
           
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

        var data = this.state.data;
        var chartData = this.state.chartData;
       
        if(data.length > 0){
            if(data.length <= chartData.datasets[0].data.length){
                let j = 6;
                let resLeng = data.length-1;
                for(let i = resLeng; i >= 0; i--){
                    chartData.datasets[0].data[j--] = data[i].value;
                }
            }else{
                let resLeng = data.length-1;
                for(var i = 6; i >= 0; i--){
                    chartData.datasets[0].data[i] =  data[resLeng--].value;
                }
            }
        }
        return(
            <Col lg="7" md="12" sm="12">
                <Card>
                    <CardHeader >
                        <CardTitle>Báo cáo</CardTitle>
                    </CardHeader>
                    <Box>
                    <CardBody >
                        <ChartLine chartData={chartData} legendPosition="top" />
                    </CardBody>
                    </Box>
                    <CardFooter >
                        <i className="fa fa-info-circle"></i> Doanh thu 7 ngày gần đây
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Chart;