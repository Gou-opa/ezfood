/*
*   author @Van Long
*/

import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
// react table
import ReactTable from "react-table";
import callApi from '../../service/APIservice'
//authentication
import {uid} from "../../service/auth"

class History extends Component{

    componentWillMount() {
        callApi( `storage/all/${uid}`, 'GET', null).then(res => {
            // console.log(res.data.storage);
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
        const  {data}  = this.state;
            
        return(
                <Card style={{margin: "10px 0px 0px 0px"}}>
                    <CardHeader >
                        <CardTitle>Nguyên Liệu</CardTitle>
                    </CardHeader>
                    <CardBody >
                    <div>
                    <ReactTable
                        showPagination = {true}
                        showPageSizeOptions = {false}
                        nextText={"Tiếp theo"}
                        previousText={"Trước"}
                        pageText={"Trang"}
                        ofText={''}
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
                                Header: "Ngày nhận",
                                accessor: "received_date"
                            },
                            {
                                width: "22%",
                                Header: "Hạn dùng",
                                accessor: "expire"
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

export default History;
