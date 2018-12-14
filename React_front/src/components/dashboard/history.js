/*
*   author @Van Long
*/

import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';

// react table
import ReactTable from "react-table";
import callApi from '../../service/APIservice'
//authentication
import {uid} from "../../service/auth"


class History extends Component{

    componentWillMount() {
        callApi( `manager/order/${uid}`, 'GET', null).then(res => {
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
        const { data, result } = this.state;

        if(data.length > 0){
            data.forEach( function(record) {
                let id = record._id;
                let date = record.create.match(/([\d]+-[\d]+-[\d]+)/gm);
                let time = record.create.match(/([\d]+:[\d]+:[\d]+)/gm);
                let datetime = date + " " + time;
                let money = 0;
                record.dishes.forEach( function(child){
                    money+=child.dish.price;
                })
                result.push({
                    id: id,
                    time: datetime,
                    money: money,
                })
            })
        }

        return(
            <Col lg="6">
            <Card >
                <CardHeader>
                    <CardTitle>Lịch sử</CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                    <ReactTable
                        showPagination = {true}
                        showPageSizeOptions = {false}
                        nextText={"Tiếp theo"}
                        previousText={"Trước"}
                        pageText={"Trang"}
                        ofText={''}
                        data={result}
                       
                        columns= {[
                            {
                                width: "30%",
                                Header: "Mã đơn hàng",
                                accessor: "id"                            },
                            {
                                width: "30%",
                                Header: "Thời gian",
                                id: "time",
                                accessor: a => a.time
                            },
                            {
                                width: "30%",
                                Header: "Số tiền",
                                accessor: "money"
                            }
                            ]
                        }
                        
                        defaultSorted={[
                            {
                              id: "time",
                              desc: true
                            }
                          ]}
                        defaultPageSize={10}
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

export default History;
