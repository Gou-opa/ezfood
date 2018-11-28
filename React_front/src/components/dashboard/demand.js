import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

// react table
import ReactTable from "react-table";

class Demand extends Component{

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
                                id: "time",
                                accessor: a => a.time
                            },
                            {
                                width: "16%",
                                Header: "Bàn",
                                accessor: "table",
                            },
                            {
                                width: "22%",
                                Header: "Món",
                                accessor: "dish"
                            },
                            {
                                width: "10%",
                                Header: "Số lượng",
                                accessor: "amount",
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