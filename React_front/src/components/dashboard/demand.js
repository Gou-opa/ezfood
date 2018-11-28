import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

// react table
import ReactTable from "react-table";
import callApi from '../../service/APIservice'

class Demand extends Component{

    componentWillMount() {
        callApi( 'manager/order', 'GET', null).then(res => {
            // console.log(res.data);
           this.setState({
              data: res.data
           })
        })
    }


    constructor() {
        super();
        this.state = {
          data: [{
                time: 1,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 10,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 10,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 10,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 5,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 14,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 4,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "7",
                option: "Thêm hành",
                status: "Đang nấu"
            },
            { 
                time: 12,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "1",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 3,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "3",
                option: "không",
                status: "Đang nấu"
            },
            { 
                time: 8,
                table: "1a1",
                dish: "Tôm hùm",
                amount: "2",
                option: "không",
                status: "Đang nấu"
            }    
        ]
            
        }
    }

    render(){
        const { data } = this.state;
        console.log(data);
        console.log(data[0]);
        console.log(typeof data[0]);
        var dt = new Date();
        var utcDate = dt.toUTCString();

        //Print results
        console.log(utcDate);

        return(
            <Card >
                <CardHeader>
                    <CardTitle>Yêu cầu</CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                    <ReactTable
                        showPagination = {true}
                        showPageSizeOptions = {false}
                        pageSizeOptions = {false}
                        // nextText={"Tiếp theo"}
                        data={data}
                       
                        columns= {[
                            {
                                width: "16%",
                                Header: "Thời gian (ph)",
                                id: "create",
                                accessor: a => a.time
                            },
                            {
                                width: "16%",
                                Header: "Bàn",
                                accessor: "tid",
                            },
                            {
                                width: "22%",
                                Header: "Món",
                                accessor: "dishes.dish.name"
                            },
                            {
                                width: "10%",
                                Header: "Số lượng",
                                accessor: "dishes.quantity",
                            },
                            {
                                width: "16%",
                                Header: "Ghi chú",
                                accessor: "option",
                            },
                            {
                                width: "16%",
                                Header: "Trạng thái",
                                accessor: "status",
                            }
                            ]
                        }
                        
                        defaultSorted={[
                            {
                              id: "time",
                              desc: false
                            }
                          ]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                    />
                        
                    <br/>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Demand;