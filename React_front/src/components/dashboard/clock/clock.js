/*
*   author @Van Long
*/

import React, { Component } from 'react';
import {Card, CardTitle } from 'reactstrap';


class Clock extends Component{

    constructor(props) {
        super(props)
        this.state = {
            time: new Date()
        }
    }
    
    componentDidMount() {
        setInterval(this.update, 1000)
    }
    
    update = () => {
        this.setState({
            time: new Date()
        })
    };
    render(){

        var weekday = new Array(7);
        weekday[0] =  "Chủ nhật";
        weekday[1] = "Thứ hai";
        weekday[2] = "Thứ ba";
        weekday[3] = "Thứ tư";
        weekday[4] = "Thứ năm";
        weekday[5] = "Thứ sáu";
        weekday[6] = "Thứ Bảy";
        
        var wd = weekday[this.state.time.getDay()];

        const d = this.state.time.getDate(); 
        const mo = this.state.time.getMonth()+1;
        const y = this.state.time.getFullYear();

        const h = this.state.time.getHours()
        const m = this.state.time.getMinutes()
        const s = this.state.time.getSeconds()

        return(
            <Card style={{ margin: "10px 0px 0px 0px", padding: "10px 0px 0px 0px"}}>
                        <CardTitle> {h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}</CardTitle>    
                        <CardTitle>{wd}, {d}.{mo}.{y}</CardTitle>
            </Card>
        );
    }
}

export default Clock;