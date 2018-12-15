import React, { Component } from 'react';
import callApi from '../../service/APIservice'
import Header from '../../components/header/header';
import { Redirect } from 'react-router-dom'
import OrderListManager from '../../components/orderlist/orderlistmanager';
import LeftContentManager from './LeftContentManager';
import { uid } from '../../service/auth'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class ManagerPage extends Component {
    componentDidMount() {
        if (localStorage.getItem('infor') === null) {
            return;
        }
        this.interval = setInterval(() => {
            callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
                // console.log(res.data)
                this.setState({
                    data: res.data
                })
            })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dishes: []
        }
        this.handledishes = this.handledishes.bind(this);
    };

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save(`${JSON.parse(localStorage.getItem("infor")).username}.pdf`);
          })
        ;
      }

    handledishes = (id, num) => {
        console.log(id);
        localStorage.setItem('tid', id);
        localStorage.setItem("tnum", num);
        callApi(`manager/order/preview/${id}/${uid}`, 'GET', null).then(res => {
            // console.log(res.data.dishes)
            if (res.data === null) {
                this.setState({
                    dishes : []
                })
                alert("Khách ở bàn này chưa gọi món !")
            } else {
                this.setState({
                    dishes: res.data.dishes
                })
            }
        })

    }

    handleCompletePayment = (id) => {
        console.log(id);
        callApi(`waiter/table/${uid}`, 'GET', null).then(res => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
    }

    duplicate = (arr) => {
        return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    }

    filterDishes = (arr) => {
        var result = [];
        let temp = arr.map(x => 1);
        for(let i = 0; i < arr.length; i++) {
            let count = 1;
            if(temp[i]) {
                temp[i] = 0;
                for(let j = 1+i ; j < arr.length; j++) {
                    if(arr[i].dish.name === arr[j].dish.name) {
                        count ++;
                        temp[j] = 0;
                    }
                }
                result.push({
                    dish : arr[i].dish,
                    quantity : count
                })

            }
        }
        return result;
    }

   

    render() {
        // console.log(this.convertArray(this.state.dishes))
        // console.log(JSON.parse(localStorage.getItem("infor")).role)
        localStorage.removeItem("picked")
        var dishes = this.filterDishes(this.state.dishes);
        // console.log(dishes);
        if ( JSON.parse(localStorage.getItem("infor"))=== null) {
            return <Redirect to='/login' />
        } else if (JSON.parse(localStorage.getItem("infor")).role !== 2) {
            return <Redirect to='/khongdu'/>
        }
        var { data, tablePicked } = this.state
        return (
            <div>
                <Header />
                <div id="wrap">
                    <LeftContentManager data={data} tablePicked={tablePicked} handledishes={this.handledishes} printDocument = {this.printDocument.bind(this)}/>
                    <OrderListManager dishes={dishes} completePayment={this.handleCompletePayment} />
                </div>
            </div>

        );
        
        // console.log(console.log(this.state.data));
       
    }
}

export default ManagerPage;
