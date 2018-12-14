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

class Demand extends Component{

    componentWillMount() {
        callApi( `manager/order/${uid}`, 'GET', null).then(res => {
            console.log({uid});
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
                let date = record.create.match(/([\d]+-[\d]+-[\d]+)/gm);
                let time = record.create.match(/([\d]+:[\d]+:[\d]+)/gm);
                let datetime = date + " " + time;                
                let table = record.tid;
                let dishes = record.dishes;
                dishes.forEach( function(child){
                    let name = child.dish.name;
                    let amount = child.quantity;
                    let status = (child.status === 1 ? "Đang chế biến": "Đang chờ");
                    result.push({
                        time: datetime,
                        table: table,
                        dish: name,
                        amount: amount,
                        status: status
                    })
                })
                
            })
        }

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
                        nextText={"Tiếp theo"}
                        previousText={"Trước"}
                        pageText={"Trang"}
                        ofText={''}
                        data={result}
                       
                        columns= {[
                            {
                                width: "16%",
                                Header: "Thời gian",
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
                                accessor: "amount"
                            },
                            {
                                width: "16%",
                                Header: "Trạng thái",
                                accessor: "status"
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

export default Demand;
