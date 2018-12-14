/*
*   author @Van Long
*/

import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
// react table
import ReactTable from "react-table";
import callApi from '../../service/APIservice'

class History extends Component{

    componentWillMount() {
        callApi( 'storekeeper/all', 'GET', null).then(res => {
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
        const  data  =
            [
                {
                    "name" : "Thịt Mông Sấn Lợn",
                    "quantity": "9kg",
                    "import-date": "12-12-2018",
                    "expire-date": "15-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Bột mì",
                    "quantity": "5kg",
                    "import-date": "12-12-2018",
                    "expire-date": "12-12-2019",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Tôm Sú Nguyên Con",
                    "quantity": "12 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "29-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Bắp Bò Úc",
                    "quantity": "24 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "12-05-2019",
                    "status": "NCC đang vận chuyển"
                },
                {
                    "name" : "Gầu Bò Úc ",
                    "quantity": "14 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "12-05-2019",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Ba Chỉ Bò Mỹ ",
                    "quantity": "25 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "12-05-2019",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Cá Hồi Tươi Nauy",
                    "quantity": "5 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "25-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Mực Trứng Cô Tô ",
                    "quantity": "10 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "29-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Lươn Biển Nhật Bản Unagi",
                    "quantity": "6 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "29-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Thịt Nạc Xay",
                    "quantity": "3 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "14-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Móng Giò Lợn",
                    "quantity": "6 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "14-12-2018",
                    "status": "Đã lưu kho"
                },
                {
                    "name" : "Thịt bê",
                    "quantity": "6 kg",
                    "import-date": "12-12-2018",
                    "expire-date": "14-12-2018",
                    "status": "Đã lưu kho"
                }
                
            ]
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
                                Header: "Ngày nhập",
                                accessor: "import-date"
                            },
                            {
                                width: "22%",
                                Header: "Hạn dùng",
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
