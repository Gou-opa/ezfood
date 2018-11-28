import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
// react table
import ReactTable from "react-table";
import callApi from '../../service/APIservice'

class RightTable extends Component{

    componentWillMount() {
        callApi( 'storekeeper/all', 'GET', null).then(res => {
            //  console.log(res.data.menu);
            console.log(res.data.storage);
           this.setState({
               data : res.data.storage
           })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    };


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
                                accessor: "name"
                            },
                            {
                                width: "16%",
                                Header: "Số lượng",
                                accessor: "quantity",
                            },
                            {
                                width: "22%",
                                Header: "Ngày nhập",
                                accessor: "import-date"
                            },
                            {
                                width: "22%",
                                Header: "Ngày xuất",
                                accessor: "expire-date"
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