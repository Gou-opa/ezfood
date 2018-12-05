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
          data: [],
          result: []
            
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