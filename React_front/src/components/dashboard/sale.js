import React, { Component } from 'react';
import {Col, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import posed from 'react-pose';


class Sale extends Component{

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
        
        const Box = posed.div({
            focusable: true,
            hoverable: true,
            pressable: true,
            init: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.1}
        })
        
        
        var data = [{ 
            saleToday: 6900000
            }]

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

        console.log(this.state.time);
            
        return(
            
            <Col lg="3" sm="12">
                
                <Card >
                    <CardHeader >
                        <CardTitle>Doanh thu</CardTitle>
                    </CardHeader>
                    <Box>
                    <CardBody >
                        <div className="round round-lg align-self-center round-info"><i className="fas fa-wallet"></i></div>
                        <div style={{display: "inline-flex"}}>   
                            <h3 className="font-light"> {data.map( x => x.saleToday )}</h3>
                            <p className="text-muted">VNĐ</p>
                        </div>
                    </CardBody>
                    </Box>
                    <CardFooter >
                        <i className="far fa-calendar-alt"></i>
                        &nbsp;Doanh thu hôm nay
                    </CardFooter>
                </Card>
                <Card style={{ margin: "10px 0px 0px 0px", padding: "10px 0px 0px 0px"}}>
                    <CardTitle> {h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}</CardTitle>    
                    <CardTitle>{wd}, {d}.{mo}.{y}</CardTitle>
                </Card>
            </Col>
        );
    }
}

export default Sale;