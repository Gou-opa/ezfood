import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

// react table
import ReactTable from "react-table";

class History extends Component{

    constructor() {
        super();
        this.state = {
          data: [{
                id: 1,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 10,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 10,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 10,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 5,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 14,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 4,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 12,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 3,
                time: "20/11/2018",
                amountMoney: "2.000.000"
            },
            { 
                id: 8,
                time: "22/11/2018",
                amountMoney: "3.000.000"

            }    
        ]
            
        }
    }

    render(){
        const { data } = this.state;
        return(
            <Card style={{margin: "10px 0px 0px 0px"}}>
                <CardHeader>
                    <CardTitle>Lịch sử</CardTitle>
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
                                width: "30%",
                                Header: "Mã đơn hàng",
                                id: "id",
                                accessor: a => a.id
                            },
                            {
                                width: "30%",
                                Header: "Thời gian",
                                accessor: "time",
                            },
                            {
                                width: "30%",
                                Header: "Số tiền",
                                accessor: "amountMoney"
                            }
                            ]
                        }
                        
                        defaultSorted={[
                            {
                              id: "time",
                              desc: true
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

export default History;