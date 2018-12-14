/*
*   author @Van Long
*/

import React, { Component } from 'react';
import ChartLine from './chartLine';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle, Button } from 'reactstrap';
import posed from 'react-pose';
import callApi from '../../service/APIservice'
// jsPDF
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//authentication
import {uid} from "../../service/auth"



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var columns = [
	{ title: "STT", dataKey: "id" },
	{ title: "Ngày", dataKey: "date" },
	{ title: "Doanh thu", dataKey: "revenue" }
];

var rows = [

];

function createPdf() {
    var doc = new jsPDF();
    doc.text('Easy Food', 14, 22);
    doc.setFontSize(18);
    doc.setTextColor(10);
    doc.setFontStyle('normal');
    doc.text("Báo cáo doanh thu", 14, 30);
    
    doc.autoTable(columns, rows, {
      startY: 50,
      margin: { horizontal: 10 },
      styles: { overflow: 'linebreak' },
      bodyStyles: { valign: 'top' },
      columnStyles: { email: { columnWidth: 'wrap' } },
      theme: "striped"
    });

    doc.save('ezfood_Report.pdf');
  }

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
        callApi( `manager/evaluate/${uid}`, 'GET', null).then(res => {
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
            // get data from last 7 day , handle 2 exception
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

            var orderid = 1;
            for(let i = 0; i < data.length; i++){
                rows.push(
                    {
                        id: orderid,
                        date: data[i].Day,
                        revenue: numberWithCommas(data[i].value)
                    }
                )
                orderid++;
            }

        }


        return(
            <Col lg="7" md="12" sm="12">
                <Card>
                    <CardHeader >
                        <CardTitle>Báo cáo &nbsp;<Button onClick={createPdf} outline color="danger" size="sm"  style={{'font-size':11}}>
                        Tải báo cáo pdf</Button>
                        </CardTitle>
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
