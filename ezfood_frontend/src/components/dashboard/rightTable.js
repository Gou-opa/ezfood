import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
// react table
import ReactTable from "react-table";

class RightTable extends Component{

    constructor() {
        super();
        this.state = {
          data: [{
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt chó",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt bò",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt mèo",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt mèo",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            },
            { 
                resources: "Thịt mèo",
                amount: "2kg",
                need: "2.2kg",
                status: "Đang vận chuyển"
            }    
        ]
            
        }
    }

    render(){
        const { data } = this.state;
        return(
            <Col lg="6">
                <Card>
                    <CardHeader >
                        <CardTitle>Nguyên Liệu</CardTitle>
                    </CardHeader>
                    <CardBody >
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
                                Header: "Nguyên Liệu",
                                accessor: "resources"
                            },
                            {
                                width: "16%",
                                Header: "Số lượng",
                                accessor: "amount",
                            },
                            {
                                width: "22%",
                                Header: "Cần thêm",
                                accessor: "need"
                            },
                            {
                                width: "10%",
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
                        defaultPageSize={11}
                        className="-striped -highlight"
                    />
                        
                    <br/>
                    </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default RightTable;