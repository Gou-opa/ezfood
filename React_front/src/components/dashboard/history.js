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